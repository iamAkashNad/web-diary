import React, {useContext} from 'react';

import NoteContext from '../context/notes/NoteContext';

export default function NoteDetail() {
  const { viewedNote, setEditedNoteData } = useContext(NoteContext);
  document.title = viewedNote.title;

  const editButtonClickedFromDetails = () => {
    setEditedNoteData({
        noteId: viewedNote.noteId, 
        title: viewedNote.title, 
        description: viewedNote.description
    });
  };


  return (
    <div className='container' style={{marginTop: "4rem"}}>
        <h3>{viewedNote.title}</h3>
        <div className='d-flex' style={{justifyContent: "space-between", alignItems: "center"}}>
        <div>
            <span className="badge text-bg-primary">{viewedNote.tag}</span>{" | "}
            <span className='text-muted'>{viewedNote.hrDate}</span>
        </div>
        <div>
            {/* <i className="fa-solid fa-trash mx-3" style={{cursor: "pointer"}}></i> */}
            <i className="fa-solid fa-pen-to-square" style={{cursor: "pointer"}} onClick={editButtonClickedFromDetails}></i>
        </div>
        </div>
      <hr />
      <div style={{marginBottom: "3rem"}}>
        <h5>Description</h5>
        <p style={{whiteSpace: "pre-wrap"}}>{viewedNote.description}</p>
      </div>
    </div>
  )
}
