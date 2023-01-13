import React, { useContext, useEffect } from "react";

import NoteItem from "./NoteItem";
import Spinner from "./Spinner";
import NoNotes from "./NoNotes";
import Error from "./Error";

import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

export default function Notes() {
  document.title = "Diary - Your notes are save & secured in cloud!";
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { notes, setNotes, toggleAlert, isLoaded, setIsLoaded, error, getError } =
    useContext(NoteContext);
  const { auth_token, setAuthToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      getError("");
      setIsLoaded(false);
      let response;
      try {
        response = await fetch(`${host}/notes`, {
          headers: {
            "auth-token": auth_token,
          },
        });
      } catch (error) {
        setIsLoaded(true);
        getError("network");
        return toggleAlert({
          type: "warning",
          message: "Network connection interrupted!",
        });
      }
      if (!response.ok) {
        if(response.status === 401) {
          setAuthToken(null);
          localStorage.removeItem("auth-token");
        } else {
          getError("server");
          toggleAlert({
            type: "warning",
            message: "Something went wrong internally!",
          });
        }
        setIsLoaded(true);
        return;
      }

      const responseData = await response.json();
      setNotes(responseData.notes);
      setIsLoaded(true);
    };
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const myStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    gap: "2rem",
  };

  return (
    <>
      <h3 className="text-center">Your Notes</h3>
      { error ? 
      <Error error={error} /> :
      !isLoaded ? (
        <div className="text-center my-3">
          <Spinner />
        </div>
      ) : !notes || notes.length === 0 ? (
        <NoNotes />
      ) : (
        <ol className="container my-3" style={myStyle}>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                noteId={note._id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                hrDate={note.hrDate}
              />
            );
          })}
        </ol>
      )}
    </>
  );
}
