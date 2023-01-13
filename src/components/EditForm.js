import React, { useContext } from "react";

import ErrorMessage from "./ErrorMessage";

import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

export default function EditForm() {
  document.title = "Diary - Edit Note!";
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { auth_token, setAuthToken, message, setMessage, setUser } = useContext(AuthContext);
  const { editedNoteData, setEditedNoteData, toggleAlert, setIsLoaded, viewedNote, setViewedNote } = useContext(NoteContext);
  const editNote = async (event) => {
    event.preventDefault();
    const editedNote = {
        title: editedNoteData.title,
        description: editedNoteData.description
    };
    let response;
    try {
        response = await fetch(`${host}/notes/${editedNoteData.noteId}/edit`, {
            method: "PATCH",
            body: JSON.stringify(editedNote),
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token
            }
        });
    } catch (error) {
        return toggleAlert({type: "warning", message: "Network connection interrupted!"});
    }
    if(!response.ok) {
        if(response.status === 401) {
            setMessage("");
            setIsLoaded(false);
            setViewedNote(null);
            setEditedNoteData(null);
            setUser(null);
            setAuthToken(null);
            localStorage.removeItem("auth-token");
        } else {
            toggleAlert({
                type: "warning",
                message: "Something went wrong internally!",
            });
        }
        return;
    }

    const responseData = await response.json();

    if(responseData.notFound) {
        return toggleAlert({type: "warning", message: "Oops! It seems that the note you wanted edit that not found!"});
    }
    if(responseData.invalid) {
        return setMessage("Invalid Note Data - Title & description of your note should fill up and description have to be of atleast 60 characters!");
    }
    if(responseData.sameTitle) {
        return setMessage("You already have a note with this title - please choose a different title for editing the note!");
    }

    if(viewedNote) {
        setViewedNote({
            noteId: editedNoteData.noteId,
            title: editedNoteData.title,
            description: editedNoteData.description,
            tag: viewedNote.tag,
            hrDate: viewedNote.hrDate
        });
    }
    setMessage("");
    setIsLoaded(false);
    setEditedNoteData(null);
    toggleAlert({type: "success", message: "Note edited successfully!"});
  };

  const closeEditPageWithoutEdit = () => {
    setMessage("");
    setEditedNoteData(null);
  };



  return (
    <>
      <h3 className="text-center">Edit Your Note</h3>
        <form onSubmit={editNote}>
            <ErrorMessage />
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
            </label>
            <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(event) => {
                    setEditedNoteData({
                        noteId: editedNoteData.noteId,
                        title: event.target.value,
                        description: editedNoteData.description
                    });
                }}
                value={editedNoteData.title}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Description
            </label>
            <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={(event) => {
                    setEditedNoteData({
                        noteId: editedNoteData.noteId,
                        title: editedNoteData.title,
                        description: event.target.value
                    });
                }}
                value={editedNoteData.description}
            >
            </textarea>
            </div>
            <div style={{textAlign: "right"}}>
                <button type="button" className="btn btn-sm btn-secondary mx-1" onClick={closeEditPageWithoutEdit}>Go Back</button>
                <button disabled={message} className="btn btn-sm btn-primary">Edit Note!</button>
            </div>
        </form>
    </>
  );
}
