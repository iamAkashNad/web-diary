import React, { useContext } from 'react';

import ErrorMessage from './ErrorMessage';

import NoteContext from '../context/notes/NoteContext';
import AuthContext from '../context/auth/AuthContext';

export default function AddNote() {
  document.title = "Diary - Add Note!";
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { setCreateMode, toggleAlert, setIsLoaded } = useContext(NoteContext);
  const { auth_token, setAuthToken, setMessage, clearUser } = useContext(AuthContext);

  const addNote = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const note = {
        title: form.get("title"),
        description: form.get("description")
    };
    const tag = form.get("tag");
    if(tag && tag.trim()) note.tag = tag.trim();
    let response;
    try {
        response = await fetch(`${host}/notes/create`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token
            }
        });
    } catch (error) {
        return toggleAlert({ type: "warning", message: "Network connection interrupt!" });
    }
    if(!response.ok) {
        if(response.status === 401) {
            setMessage("");
            setCreateMode(false);
            setIsLoaded(false);
            setAuthToken(null);
            clearUser();
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
    if(responseData.invalid) {
        return setMessage("Invalid Note Data - Title & description of your note should fill up and description have to be of atleast 60 characters!");
    }
    if(responseData.sameTitle) {
        return setMessage("You already have a note with this title - please choose a different title!");
    }

    setMessage("");
    setCreateMode(false);
    toggleAlert({ type: "success", message: "Note added successfully!" });
    setIsLoaded(false);
  };




  return (
    <>
    <h3 className="text-center">Create A Note</h3>
    <form onSubmit={addNote}>
        <ErrorMessage />
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Eat healthy food" required />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="eg. Health" maxLength={15} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description' rows="5" minLength={60} required></textarea>
        </div>
        <div style={{textAlign: "right"}}>
            <button className="btn btn-primary">Create Note!</button>
        </div>
    </form>
    </>
  )
}
