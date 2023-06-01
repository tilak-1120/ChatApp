import React, { useContext, useRef } from "react";
import axios from "axios";
import { userContext } from "../../App";

function AddConversation() {
  const receiverUser = useRef();
  const { setIsOpen, usm } = useContext(userContext);

  const addConv = async (req, res) => {
    try {
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
    <div>
      <input type="text" placeholder="Username" ref={receiverUser} />
      <button onClick={handleClick}>Add</button>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Go Back Baby!
      </button>
    </div>
  );
}

export default AddConversation;
