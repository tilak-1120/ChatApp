import React, { useContext, useRef } from "react";
import "./addConversation.css";
import axios from "axios";
import { userContext } from "../../App";

function AddConversation() {
  const receiverUser = useRef();
  const { setIsOpen, usm, conv } = useContext(userContext);

  const addConv = async (req, res) => {
    try {
      var convUsers = [];
      // console.log(receiverUser.current.value);

      const findUser = await axios.get(
        "/api/v1/getuser/" + receiverUser.current.value
      );

      if (findUser) {
        conv.map((key) => {
          key.members.filter((elm) => {
            if (elm !== usm) {
              let m = elm;
              convUsers.push(m);
            }
          });
        });
      }

      if (findUser.status === 404) {
        alert("Invalid Username");
      } else {
        if (convUsers.length !== 0) {
          // console.log("Inside findUser");
          // console.log(convUsers);
          return (
            convUsers.find((user) => user === receiverUser.current.value) &&
            alert("This friend already exists")
          );
        }
      }

      // console.log("Inside post conv");

      const response = await axios.post("/api/v1/addconv", {
        senderUser: usm,
        receiverUser: receiverUser.current.value,
      });

      if (response) {
        // console.log(response.data._id);
        alert("New Friend Added Successfully");
        setIsOpen(false);
      } else {
        alert("User doesn't exists");
      }
    } catch (err) {
      alert("Invalid Username");
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addConv();
  };

  return (
    <>
      <div className="addconvMain">
        <input
          className="input"
          type="text"
          placeholder="Enter Username"
          ref={receiverUser}
        />
        <div className="buttons">
          <button className="addButton" onClick={handleClick}>
            Add
          </button>
          <button
            className="backButton"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div>
    </>
  );
}

export default AddConversation;
