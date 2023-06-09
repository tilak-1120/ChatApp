import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./messenger.css";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Topbar from "../../components/topbar/Topbar";
import { io } from "socket.io-client";

function Messenger() {
  const [newMsg, setNewMsg] = useState("");
  const [receiver, setReceiver] = useState();
  const [arrivalMsg, setArrivalMsg] = useState(null);

  const {
    usm,
    conversationId,
    isDone,
    setIsDone,
    setMsg,
    otherName,
    setUsersOnline,
  } = useContext(userContext);

  const navigate = useNavigate();
  const scrollRef = useRef();
  const newMessage = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMsg({
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    getMembersArray();
  }, [conversationId]);

  useEffect(() => {
    arrivalMsg && setMsg((prev) => [...prev, arrivalMsg]);

    // console.log(arrivalMsg);
  }, [arrivalMsg, setMsg]);

  useEffect(() => {
    // setSocket(io("ws://localhost:5000"));
    if (!usm) {
      navigate("/error");
    }
    socket.current.emit("addUser", usm);
    socket.current.on("getUsers", (users) => {
      setUsersOnline(users);
      console.log(users);
    });
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

      socket.current.emit("sendMessage", {
        sender: usm,
        receiver: receiver,
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

  useEffect(() => {
    scrollRef?.current.scrollIntoView({ behavior: "smooth", block: "end" });
    // const s = scrollRef.current;
    // s.scrollTop = s.scrollHeight;
  }, [arrivalMsg, sendMessage]);

  const getMembersArray = async () => {
    try {
      if (conversationId) {
        const response = await axios.get(
          "/api/v1/getspecificconv/" + conversationId
        );
        const n = response.data.members.filter((elm) => {
          return elm !== usm;
        });
        // console.log(n);
        setReceiver(n);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newMessage.current.value === "") {
      alert("Can't send empty message..!!!");
      document.getElementById("sendBox").focus();
    } else {
      sendMessage();
    }
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
          {conversationId && <div className="selectedUser">{otherName}</div>}
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <div className="msgBox" ref={scrollRef}>
                {conversationId ? (
                  <Message />
                ) : (
                  <>
                    <span className="noConversationText">
                      Open a conversation,
                    </span>
                    <span className="noConversationText2">
                      To start a chat.
                    </span>
                  </>
                )}
              </div>
            </div>
            {conversationId && (
              <div className="chatBoxBottom">
                <textarea
                  id="sendBox"
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
            )}
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
