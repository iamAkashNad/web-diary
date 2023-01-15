import React, { useContext } from "react";

import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

export default function NoteItem({ noteId, title, description, tag, hrDate }) {
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { notes, setNotes, setEditedNoteData, toggleAlert, setViewedNote, setIsLoaded } = useContext(NoteContext);
  const { auth_token, setAuthToken, clearUser } = useContext(AuthContext);

  const editButtonClicked = () => {
    setEditedNoteData({noteId, title, description});
  };

  const deletebuttonClicked = async () => {
    let response;
    try {
      response = await fetch(`${host}/notes/${noteId}/delete`, {
        method: "DELETE",
        headers: {
          "auth-token": auth_token
        }
      });
    } catch (error) {
      return toggleAlert({ type: "warning", message: "Network connection interrupted!" });
    }
    if(!response.ok) {
      if(response.status === 401) {
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
    if(responseData.notFound) {
      return toggleAlert({type: "warning", message: "Note not found!"});
    }
    const newNotes = notes.filter(note => note._id !== noteId);
    setNotes(newNotes);
    toggleAlert({type: "success", message: responseData.message});
  };

  const viewDetails = () => {
    setViewedNote({noteId, title, description, tag, hrDate});
    setIsLoaded(false);
  };



  return (
    <li
      className="card"
      style={{
        textAlign: "left",
        backgroundColor: "rgb(200, 213, 255)",
        padding: "1rem 1rem",
        width: "100%",
        height: "100%",
        border: "1px solid rgb(143, 143, 246)",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h5 className="card-title">{title.length <= 24 ? title : title.slice(0, 24) + "..."}</h5>
      <p className="card-text">{description.length <= 65 ? description : description.slice(0, 65) + "..."}</p>
      <div>
        <span className="badge text-bg-primary">{tag}</span>
      </div>
      <p className="card-text"><small className="text-muted">{hrDate}</small></p>
      <div style={{ textAlign: "right" }}>
        <button className="btn btn-sm btn-outline-primary mx-1">
          <i className="fa-solid fa-trash" onClick={deletebuttonClicked}></i>
        </button>
        <button className="btn btn-sm btn-primary" onClick={editButtonClicked}><i className="fa-solid fa-pen-to-square"></i></button>
        <button className="btn btn-sm btn-primary mx-1"  onClick={viewDetails} style={{fontSize: "0.9rem"}}>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </li>
  );
}
