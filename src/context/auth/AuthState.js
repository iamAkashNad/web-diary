import { useState } from "react";

import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const [auth_token, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const collection = { auth_token, setAuthToken, message, setMessage, user, setUser };
  return (
    <AuthContext.Provider value={collection}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
