import React from "react";
import './css/NotFound.css';  // Import CSS file

const NotFound = () => {
  return (
    <div className="text-center" style={{ padding: "50px" }}>
      <h1>404</h1>
      <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page.</p>
      <section className="error-container">
        <span>4</span>
        <span><span className="screen-reader-text">0</span></span>
        <span>4</span>
      </section>
      <div className="link-container">
        <a target="_blank" href="/productuser" className="more-link">
            Back To Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
