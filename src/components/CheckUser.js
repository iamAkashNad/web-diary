import React from 'react';

import ErrorMessage from './ErrorMessage';

export default function CheckUser({ name, password, setPassword, setMessage, editUserInfo, closeRef }) {
  return (
    <div className="modal fade" id="checkValidUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    onClick={()=>{setMessage("");}}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you {name}?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>{setMessage("")}} ref={closeRef} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <ErrorMessage />
                <div className="my-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label"><strong>Prove!</strong></label>
                    <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder='Your Password(required)' value={password} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editInfoModal">Back</button>
                {(password && password.trim()) && 
                    <button type="button" className="btn btn-primary" onClick={editUserInfo}>Update changes</button>
                }
            </div>
            </div>
        </div>
    </div>
  )
}
