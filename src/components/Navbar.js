import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import NoteContext from '../context/notes/NoteContext';

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();

  const { createMode, setCreateMode, setEditedNoteData, viewedNote, setViewedNote } = useContext(NoteContext);
  const { setMessage, auth_token, setAuthToken, clearUser } = useContext(AuthContext);

  const handleClick = () => {
    setMessage("");
    setCreateMode(false);
    setViewedNote(null);
    setEditedNoteData(null);
  };

  const getAddNote = () => {
    setMessage("");
    setEditedNoteData(null);
    if(!createMode) setCreateMode(true);
    else setCreateMode(false);
  };

  const logout = () => {
    handleClick();
    setAuthToken(null);

    clearUser();
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" onClick={handleClick} to={auth_token ? "/profile" : "/login"}>Diary</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item" style={{display: auth_token ? "block" : "none"}}>
                        <Link className={`nav-link ${ location.pathname === "/" ? "active" : "" }`} onClick={handleClick} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item" style={{display: !auth_token ? "block" : "none"}}>
                        <Link className={`nav-link ${ location.pathname === "/signup" ? "active" : "" }`} onClick={handleClick} aria-current="page" to="/signup">Sign up</Link>
                    </li>
                    <li className="nav-item" style={{display: !auth_token ? "block" : "none"}}>
                        <Link className={`nav-link ${ location.pathname === "/login" ? "active" : "" }`} onClick={handleClick} to="/login">Login</Link>
                    </li>
                    <li className="nav-item" style={{display: auth_token ? "block" : "none"}}>
                        <span className="nav-link" style={{cursor: "pointer"}} onClick={logout}>Logout</span>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/about" ? "active" : "" }`} onClick={handleClick} to="/about">About</Link>
                    </li>
                </ul>
                <div style={{display: auth_token && location.pathname === "/" && !viewedNote ? "block" : "none"}}>
                    {/* <i class="fa-solid fa-plus"  style={{fontSize: "1.5rem", cursor: "pointer"}}></i> */}
                    <i className="fa-solid fa-pencil mx-2" style={{fontSize: "1.5rem", cursor: "pointer"}} onClick={getAddNote}></i>
                    {/* <i className="fa-regular fa-pen-to-square" style={{fontSize: "1.5rem", cursor: "pointer"}} onClick={getAddNote}></i> */}
                </div>
            </div>
        </div>
    </nav>
  );
}
