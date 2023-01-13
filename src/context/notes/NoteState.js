import { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const [editedNoteData, setEditedNoteData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [viewedNote, setViewedNote] = useState(null);
  const [error, setError] = useState("");

  const toggleAlert = (alertData) => {
    setAlert(alertData);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const getError = (type) => {
    if(!type)
      setError("");
    else if(type === "network")
      setError("\"Your network seems very unstable - please connect to a stable network.\"");
    else if(type === "server")
      setError("\"Something went wrong to the server - we are trying our best for fixing it as soon as possible.\"");
    else if(type === "unauthenticated")
      setError("\"Your auththentication status is not looking good - please login again and come for this page.\"");
  }

  const collection = {
    notes,
    setNotes,
    createMode,
    setCreateMode,
    editedNoteData,
    setEditedNoteData,
    alert,
    toggleAlert,
    isLoaded,
    setIsLoaded,
    viewedNote,
    setViewedNote,
    error,
    getError
  };
  return (
    <NoteContext.Provider value={collection}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
