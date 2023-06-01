import React, { useContext, useRef } from "react";
import "./addConversation.css";
import axios from "axios";
import { userContext } from "../../App";

function AddConversation() {
  const receiverUser = useRef();
  const { setIsOpen, usm } = useContext(userContext);

  const addConv = async (req, res) => {
    try {
      const findUser = await axios.post("/api/v1/getuser", {
        username: receiverUser.current.value,
      });

      if (!findUser && res.status === 404) {
        alert("User doesn't exists");
      }

      const response = await axios.post("/api/v1/addconv", {
        senderUser: usm,
        receiverUser: receiverUser.current.value,
      });

      if (response) {
        console.log(response.data._id);
        alert("New Conversation Added Successfully");
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addConv();
  };

  return (
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
  );
}

export default AddConversation;
