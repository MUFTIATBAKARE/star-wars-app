import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="no-content-container">
      <Link to={`/`}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sampleproject-d6fc9.appspot.com/o/output-onlinepngtools.png?alt=media&token=d7ab0456-2a40-4e00-be59-3c6b47f55abf"
          alt=""
        />
      </Link>
      <h2>The page you were looking for doesn't exist.</h2>
      <p>You may have mistyped the address or the page may have moved.</p>
      <p>
        Click the image to go <span className="go-home">BACK TO HOMEPAGE</span>{" "}
      </p>
    </div>
  );
};

export default NotFound;
