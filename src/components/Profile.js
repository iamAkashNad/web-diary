import React, { useContext } from 'react';

import AuthContext from '../context/auth/AuthContext';

import Guide from './Guide';

export default function Profile() {
  const { user, auth_token } = useContext(AuthContext);
  return ( user && auth_token ?
    <div className='container my-5 text-center'>
        <h3 className='my-3'>Your Profile</h3>
        <div style={{width: "40%", margin: "auto", borderRight: "1px solid black", borderLeft: "1px solid black", borderRadius: "6px"}}>
            <hr style={{borderColor: "black"}} />
            <h6>Name: {user.name}</h6>
            <hr />
            <h6>Email: {user.email}</h6>
            <hr />
            <h6>Profession: {user.profession ? user.profession : "Not Mentioned"}</h6>
            <hr />
        </div>
        <h5 className='mb-0'>Bio:</h5>
        <p style={{whiteSpace: "pre-wrap"}}>{user.bio ? user.bio : "No bio."}</p>
    </div> : <Guide />
  )
}
