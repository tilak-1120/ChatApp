import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./messenger.css";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Topbar from "../../components/topbar/Topbar";
// import { io } from "socket.io-client";

function Messenger() {
  const [newMsg, setNewMsg] = useState("");
  // const [socket, setSocket] = useState(null);
  const { usm, conversationId, isDone, setIsDone, otherName } = useContext(userContext);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const newMessage = useRef();
  // const socket = useRef(io("ws://localhost:5000"));

  useEffect(() => {
    // setSocket(io("ws://localhost:5000"));
    // socket.current.emit("addUser", usm);
  }, [usm]);

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!usm) {
      navigate("/error");
    }
  }, [usm]);

  const sendMessage = async (req, res) => {
    try {
      if (!conversationId) {
        alert("Please Select Conversation");
      }
      const response = await axios.post("/api/v1/addmsg", {
        conversationId: conversationId,
        sender: usm,
        text: newMsg,
      });
      setNewMsg("");
      newMessage.current.value = "";
      setIsDone(!isDone);
      console.log(response);
    } catch (err) {
      console.log(err);
      setNewMsg("");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <div className="convs">
              <Conversation />
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="selectedUser">{otherName}</div>
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <div className="msgBox" ref={scrollRef}>
                {conversationId ? (
                  <Message />
                ) : (
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                )}
              </div>
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Send a chat..!"
                onChange={() => {
                  setNewMsg(newMessage.current.value);
                }}
                ref={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleClick}>
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
