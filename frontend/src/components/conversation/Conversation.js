import React, { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { userContext } from "../../App";
import AddConversation from "../addConversation/AddConversation";
import axios from "axios";
import { Link } from "react-router-dom";

function Conversation() {
  const [conv, setConv] = useState([]);
  const { usm, isOpen, setIsOpen, setConversationId } = useContext(userContext);
  const getConv = async (req, res) => {
    try {
      if (usm) {
        const response = await axios.get("/api/v1/getconv/" + usm);
        setConv(response.data);
        // console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConv();
  });

  if (!usm) {
    return (
      <div>
        <h1>Plz </h1>
        <Link to="/">Login</Link>
      </div>
    );
  }

  return isOpen ? (
    <AddConversation />
  ) : (
    <>
      <div>Username: {usm}</div>
      <button onClick={() => setIsOpen(!isOpen)}>Add New Conversation</button>

      {conv.map((key) => {
        return (
          <div
            className="conversation"
            onClick={() => {
              setConversationId(key._id);
            }}
          >
            <img
              className="conversationImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <span className="conversationName">
              {key.members[1] === usm ? key.members[0] : key.members[1]}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default Conversation;
