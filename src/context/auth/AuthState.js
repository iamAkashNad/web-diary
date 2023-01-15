import { useState } from "react";

import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [auth_token, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );
  const [user, setUser] = useState(localStorage.getItem("email") ? {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    profession: localStorage.getItem("profession"),
    bio: localStorage.getItem("bio"),
  } : null);
  const [message, setMessage] = useState("");

  const clearUser = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profession");
    localStorage.removeItem("bio");
    setUser(null);
  };

  const collection = { auth_token, setAuthToken, message, setMessage, user, setUser, clearUser };
  return (
    <AuthContext.Provider value={collection}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
