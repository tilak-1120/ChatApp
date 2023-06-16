import React, { useContext, useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

function Register() {
  const { usm } = useContext(userContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const registerCall = async (username, email, password) => {
    try {
      const findUser = await axios.get("/api/v1/getuser/" + username);

      if (findUser) {
        return alert("User Already Exists..!!!");
      }

      const response = await axios.post("/api/v1/register", {
        username,
        email,
        password,
      });

      response ? navigate("/") : alert("Registration Unsuccessfull");
    } catch (err) {
      alert("Email Already Taken..!!!");
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (password.current.value === passwordAgain.current.value) {
      registerCall(
        username.current.value,
        email.current.value,
        passwordAgain.current.value
      );
      console.log("Register Successfull");
    } else {
      alert("Password and Confirm Password doesn't match");
    }
  };

  return (
    <>
      {!usm ? (
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">ChatApp</h3>
              <span className="loginDesc">
                Connect with us by conecting with the world.
              </span>
            </div>
            <div className="loginRight">
              <form method="POST" className="loginBox" onSubmit={handleClick}>
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
                <button
                  className="loginRegisterButton"
                  type="submit"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        navigate("/error")
      )}
    </>
  );
}

export default Register;
