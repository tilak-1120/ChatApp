import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import Login from "../login/Login";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const registerCall = async (username, email, password) => {
    try {
      const response = await axios.post("/api/v1/register", {
        username,
        email,
        password,
      });

      {
        response ? <Login /> : alert("Registration Unsuccessfull");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    registerCall(
      username.current.value,
      email.current.value,
      passwordAgain.current.value
    );
    console.log("Register Successfull");
  };

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">ChatApp</h3>
            <span className="loginDesc">
              Connect with us by conecting with the world.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Confirm Password"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button className="loginRegisterButton">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
