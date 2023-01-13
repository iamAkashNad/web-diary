import React, { useContext } from "react";

import NoteContext from "../context/notes/NoteContext";

export default function Alert() {
  const { alert } = useContext(NoteContext);
  const myStyle = {
    display: "block",
    cursor: "pointer",
    top: "52.8px"
  };

  
  return ( alert &&
    <div className={`alert fixed-top alert-${alert.type}`} style={myStyle} role="alert">{alert.message}</div>
  );
}
