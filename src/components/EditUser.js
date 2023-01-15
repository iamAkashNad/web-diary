import React from 'react'

export default function EditUser({ profession, bio, info, updateInfo, discardChanges, setPassword }) {
  return (
    <div className="modal fade" id="editInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Info</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Your Profession</label>
                    <input type="text" className="form-control" id="updated-profession" value={info.profession} 
                    placeholder={"eg. Student"} onChange={(event) => {updateInfo(event, "profession")}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Bio</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" value={info.bio} 
                    placeholder={"eg. I am a student"} 
                    onChange={(event) => {updateInfo(event, "bio")}}></textarea>
                </div>
            </div>
            {(info.profession.trim() !== profession || info.bio.trim() !== bio) &&
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={discardChanges}>Discard</button>
                <button type="button" className="btn btn-primary" 
                    data-bs-toggle="modal" onClick={()=>{setPassword("");}} data-bs-target="#checkValidUser">
                        Continue
                </button>
            </div>}
            </div>
        </div>
    </div>
  )
}
