import React from "react";
import { Link } from "react-router-dom";

export default function Guide() {
  document.title = "401! - Authentication must resquired";
  return (
    <div className="my-5 text-center">
      <span style={{ fontSize: "3.5rem" }}>
      <i className="fa-solid fa-lock fa-shake"></i>
      </span>
      <h3>Authentication Required!</h3>
      <p>
        This page is only for authenticated users! please{" "}
        <Link className="link-primary"  style={{textDecoration: "none"}} to="/login">
          login
        </Link>{" "}
        first before visit this page.
      </p>
    </div>
  );
}
