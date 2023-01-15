import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import NoteContext from '../context/notes/NoteContext';

import CheckUser from './CheckUser';
import EditUser from './EditUser';

export default function UserModal({ name, profession, bio }) {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_BACKEND_HOST;

  const closeRef = useRef(null);
  const { auth_token, setAuthToken, setMessage, clearUser } = useContext(AuthContext);
  const { toggleAlert } = useContext(NoteContext);

  const [info, setInfo] = useState({profession, bio});
  const [password, setPassword] = useState("");

  const editUserInfo = async () => {
    if(!password || !password.trim()) return;
    let response;
    try {
        response = await fetch(`${host}/user/auth/profile/edit`, {
            method: "PATCH",
            body: JSON.stringify({...info, password}),
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token
            }
        });
    } catch (error) {
        return toggleAlert({ type: "warning", message: "Network connection interrupted!" });
    }

    if(!response.ok) {
        if(response.status === 401) {
            setMessage("");
            setAuthToken(null);
            clearUser();
            localStorage.removeItem("auth-token");
            navigate("/login");
        } else {
            toggleAlert({
              type: "warning",
              message: "Something went wrong internally!",
            });
        }
        return;
    }

    const responseData = await response.json();

    if(responseData.notYou) {
        setMessage("Update process failed!");
        return;
    }

    toggleAlert({type: "success", message: "Changes has been saved. Now login again for view the change!"});
    setMessage("");
    closeRef.current.click();
    setAuthToken(null);
    clearUser();
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  const discardChanges = () => {
        setMessage("");
        setPassword("");
        setInfo({profession, bio});
    };

  const updateInfo = (event, option) => {
    setInfo({
        profession: option === "profession" ? event.target.value : info.profession,
        bio: option === "bio" ? event.target.value : info.bio
    });
  };

  return (
    <>
        <CheckUser 
            name={name}
            password={password} 
            setPassword={setPassword} 
            setMessage={setMessage} 
            discardChanges={discardChanges} 
            editUserInfo={editUserInfo} 
            closeRef={closeRef}
        />
        <EditUser 
            bio={bio} 
            info={info} 
            profession={profession} 
            updateInfo={updateInfo}
            setPassword={setPassword}
            discardChanges={discardChanges}
        />
    </>
  );
}
