import React, { useContext, useEffect, useState } from "react";
import "./message.css";
import { userContext } from "../../App";
import axios from "axios";
import { format } from "timeago.js";

function Message() {
  const { conversationId, usm, isDone } = useContext(userContext);
  const [msg, setMsg] = useState([]);

  const getMessages = async (req, res) => {
    try {
      if (conversationId) {
        const response = await axios.get("/api/v1/getmsg/" + conversationId);
        setMsg(response.data);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, [conversationId, isDone]);

  return (
    <>
      {/* <div className="message">
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageText">
            Hello, how are you? I am random user and getting messages through
            ChatApp and its a wonderfulapplication I love to use it
          </p>
        </div>
        <div className="messageBottom">50 mins ago</div>
      </div> */}

      {msg.map((key) => {
        return (
          <div className={key.sender === usm ? "message own" : "message"}>
            <div className="messageTop">
              <img
                className="messageImg"
                src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <p className="messageText">{key.text}</p>
            </div>
            <div className="messageBottom">{format(key.createdAt)}</div>
          </div>
        );
      })}
    </>
  );
}

export default Message;
