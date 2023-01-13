import React, { useContext } from "react";

import Notes from "./Notes";
import EditForm from "./EditForm";
import AddNote from "./AddNote";
import Guide from "./Guide";
import NoteDetail from "./NoteDetail";

import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

export default function Home() {
  const { editedNoteData, createMode, viewedNote } = useContext(NoteContext);
  const { auth_token } = useContext(AuthContext);
  return (
    <div className="my-5">
      {editedNoteData && auth_token ? <EditForm /> :
        auth_token && createMode ? <AddNote /> :
        auth_token && viewedNote ? <NoteDetail /> :
        auth_token ? <Notes /> :
        <Guide />
      }
    </div>
  );
}
