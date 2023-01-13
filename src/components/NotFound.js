import React from 'react';

export default function NotFound() {
  document.title = "404 - Not Found!";
  return (
    <div className='container my-5 text-center'>
        <i
        className="fa-solid fa-triangle-exclamation"
        style={{ fontSize: "5rem" }}
      ></i>
        <p><strong>Ooop!</strong> we aren't able to find the resource which you want to access.</p>
    </div>
  )
}
