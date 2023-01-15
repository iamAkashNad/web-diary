import React from 'react'

export default function User({ user }) {
  document.title = `Hello ${user.name.split(" ")[0]}!`;
  return (
    <div className='my-5'>
      <h3 className='text-center'>Your Profile</h3>
      <form id='profile-form' className='mt-3'>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" value={user.name} disabled={true} readOnly={true} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Your Email Address</label>
          <input type="email" className="form-control" id="email" value={user.email} disabled={true} readOnly={true} />
        </div>
        <hr style={{borderColor: "blue"}} className='my-4' />
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Your Profession</label>
          <input type="text" className="form-control" style={{backgroundColor: "#fff"}} id="profession" value={user.profession ? user.profession : "(Not Mention)"} disabled={true} readOnly={true} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Bio</label>
          <textarea className="form-control" style={{backgroundColor: "#fff"}} id="exampleFormControlTextarea1" rows="6" value={user.bio ? user.bio : "(No bio)"} disabled={true} readOnly={true}></textarea>
        </div>
        <div className='text-center'>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editInfoModal">Edit Details</button>
        </div>
      </form>
    </div>
  )
}
