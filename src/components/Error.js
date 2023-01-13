import React from "react";

export default function Error({ error }) {
  return (
    <div className="container text-center my-4">
      {/* <i className="fa-solid fa-rotate-right"></i> */}
      <i
        className="fa-solid fa-triangle-exclamation"
        style={{ fontSize: "5rem" }}
      ></i>
      <p>{error}</p>
    </div>
  );
}
