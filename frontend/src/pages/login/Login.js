import React, { useContext } from "react";
import axios from "axios";
import "./login.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

function Login() {
  const { setUsm } = useContext(userContext);
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const loginCall = async (username, password) => {
    try {
      const response = await axios.post("/api/v1/login", {
        username,
        password,
      });

      response ? navigate("/home") : alert("Login Unsuccessfull");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(username.current.value, password.current.value);
    setUsm(username.current.value);
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
              placeholder="Username"
              type="text"
              required
              className="loginInput"
              ref={username}
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
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
