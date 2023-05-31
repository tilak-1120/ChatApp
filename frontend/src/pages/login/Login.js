import React from "react";
import axios from "axios";
import "./login.css";
import Messenger from "../messenger/Messenger";
import { useRef } from "react";

function Login() {
  const email = useRef();
  const password = useRef();

  const loginCall = async (email, password) => {
    try {
      const response = await axios.post("/api/v1/login", {
        email,
        password,
      });

      {
        response ? <Messenger /> : alert("Login Unsuccessfull");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(email.current.value, password.current.value);
    console.log("Login Successfull");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChatApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you with ChatApp
          </span>
        </div>
        <div className="loginRight">
          <form method="POST" className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create new account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
