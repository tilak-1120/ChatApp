import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div>
        <h1>Please Login To Enjoy Chatting..!! </h1>
        <Link to="/">
          <h1>Login</h1>
        </Link>
      </div>
    </>
  );
}

export default Error;
