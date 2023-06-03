import React from "react";
import "./error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div>
        <h1 className="heading">Please Login To Enjoy Chatting..!! </h1>
        <Link to="/">
          <h1 className="heading">Login</h1>
        </Link>
      </div>
    </>
  );
}

export default Error;
