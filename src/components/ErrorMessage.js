import { useContext } from "react";

import AuthContext from "../context/auth/AuthContext";

export default function ErrorMessage() {
  const { message, setMessage } = useContext(AuthContext);
  const messageStyle = {
    padding: "0.2rem 0.4rem",
    backgroundColor: "rgb(255, 196, 196, 0.3)",
    color: "rgb(246, 109, 109)",
    border: "1px solid rgb(246, 109, 109)",
    borderRadius: "3px",
  };
  return (
    message && (
      <div style={messageStyle} className="d-flex justify-content-between">
        <p style={{marginBottom: "0", textAlign: "center"}}>{message}</p>
        <i
          className="fa-solid fa-xmark"
          style={{ cursor: "pointer", fontSize: "1.2rem" }}
          onClick={() => {
            setMessage("");
          }}
        ></i>
      </div>
    )
  );
}
