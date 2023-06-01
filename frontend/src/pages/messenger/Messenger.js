import React, { useContext, useState } from "react";
import "./messenger.css";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

function Messenger() {
  const [newMsg, setNewMsg] = useState("");
  const { usm, conversationId, isDone, setIsDone } = useContext(userContext);

  const sendMessage = async (req, res) => {
    try {
      const response = await axios.post("/api/v1/addmsg", {
        conversationId: conversationId,
        sender: usm,
        text: newMsg,
      });
      setNewMsg("");
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

  if (!usm) {
    return (
      <div>
        <h1>Please Login To Enjoy Chatting..!! </h1>
        <Link to="/">
          <h1>Login</h1>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <div>
              <Conversation />
            </div>
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <div>
                <Message />
              </div>
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Send a chat..!"
                onChange={(e) => {
                  setNewMsg(e.target.value);
                }}
                value={newMsg}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleClick}>
                Send
              </button>
            </div>

            {/* <span className="noConversationText">
                Open a conversation to start a chat.
              </span> */}
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
