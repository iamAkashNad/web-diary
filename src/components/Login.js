import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import NoteContext from '../context/notes/NoteContext';

import ErrorMessage from './ErrorMessage';

export default function Login() {
  const navigate = useNavigate();
  document.title = "Diary - Login!";
  const host = process.env.REACT_APP_BACKEND_HOST;

  const { message, setMessage, setAuthToken, setUser } = useContext(AuthContext);
  const { toggleAlert, setIsLoaded } = useContext(NoteContext);
  
  const login = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const user = {
      email: form.get("email"),
      password: form.get("password")
    }
    let response;
    try {
      response = await fetch(`${host}/user/auth/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
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
    if(responseData.credentialError) {
      return setMessage("Please enter some valid credentials!");
    }

    setAuthToken(responseData.authToken);
    localStorage.setItem("auth-token", responseData.authToken);
    setUser(responseData.user);

    setMessage("");
    setIsLoaded(false);
    toggleAlert({type: "success", message: `Welcome ${responseData.user.name.split(" ")[0]} - We are gled that you came!`});
    navigate("/");
  };



  return (
    <div className='my-5'>
    <h3 className='text-center'>Log In</h3>
    <form onSubmit={login}>
        <ErrorMessage />
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' required />
        </div>
        <div>
          <button disabled={message} type="submit" className="btn btn-primary">Login</button>
        </div>
        <div className='my-2'>
          <p>Don't have any account? <Link className='link-primary' style={{textDecoration: "none"}} to="/signup">Signup</Link> first.</p>
        </div>
    </form>
    </div>
  )
}
