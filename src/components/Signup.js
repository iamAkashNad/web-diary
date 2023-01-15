import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import NoteContext from '../context/notes/NoteContext';

import ErrorMessage from './ErrorMessage';

export default function Signup() {
  document.title = "Diary - Signup!";
  const host = process.env.REACT_APP_BACKEND_HOST;
  const { setMessage } = useContext(AuthContext);
  const { toggleAlert } = useContext(NoteContext);
  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const user = {
        name: form.get("username"),
        email: form.get("email"),
        password: form.get("password"),
        profession: form.get("profession"),
        bio: form.get("bio")
    };
    let response;
    try {
        response = await fetch(`${host}/user/auth/signup`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch(error) {
        toggleAlert({ type: "warning", message: "Network connection interrupted!" });
        return;
    }

    if(!response.ok) {
        toggleAlert({type: "warning", message: "Something went wrong internally!"});
        return;
    }
    const responseData = await response.json();
    if(responseData.invalid) {
        return setMessage("Invalid Input - Please enter some valid ones!");
    }
    if(responseData.userExist) {
        return setMessage("User already exists with this email!");
    }

    setMessage("");
    navigate("/login");
  }



  return (
    <div className='my-5'>
        <h3 className='text-center'>Sign up</h3>
        <form onSubmit={signup}>
            <ErrorMessage />
            <div className="mb-3">
                <label htmlFor="username" className="form-label">User name</label>
                <input type="text" className="form-control" id="username" name='username' required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' required />
            </div>
            <div className="mb-3">
                <label htmlFor="profession" className="form-label">Profession</label>
                <input type="text" className="form-control" id="profession" name='profession' />
            </div>
            <div className="mb-3">
                <label htmlFor="bio" className="form-label">Your bio</label>
                <textarea type="text" className="form-control" id="bio" name='bio' rows="5"></textarea>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </div>
            <div className='my-2'>
                <p>Already have an account? <Link className='link-primary' style={{textDecoration: "none"}} to="/login">Login</Link> instead.</p>
            </div>
        </form>
    </div>
  )
}
