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
  const [grpMsg, setGrpMsg] = useState(null);

  const {
    usm,
    conversationId,
    isDone,
    setIsDone,
    setMsg,
    otherName,
    setUsersOnline,
    isProfileOpen,
    setIsProfileOpen,
    setGroupMessage,
    setUnseenMsgs,
    unseenMsgs,
    refresh,
    msg
  } = useContext(userContext);

  const navigate = useNavigate();
  const scrollRef = useRef();
  const newMessage = useRef();
  const socket = useRef();

  const print = (req,res) => {
    console.log(arrivalMsg);
    if(arrivalMsg?.receiver !== arrivalMsg?.sender)
    {
      setUnseenMsgs(prev=>{
        return [...prev, arrivalMsg.sender]
      })
    }
    // console.log(unseenMsgs);
  }



  useEffect(()=>{
    print();
  },[arrivalMsg]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      console.log(data);
      setArrivalMsg({
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
        receiver: usm,
      });
    });
    socket.current.on("getGroupMessage", (data) => {
      setGrpMsg({
        sender: data.sender,
        text: data.text,
        groupname: otherName,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    getMembersArray();
  }, [conversationId.id]);

  useEffect(() => {
    arrivalMsg && setMsg((prev) => [...prev, arrivalMsg]);
    grpMsg && setGroupMessage((prev) => [...prev, grpMsg]);
    // console.log(arrivalMsg);
  }, [arrivalMsg, setMsg, grpMsg, setGrpMsg, setGroupMessage, refresh]);

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

    socket.current.emit("addGroupUsers", usm); // need to be changed
    socket.current.on("getGroupUsers", (users) => {
   
    });
  }, [usm, conversationId.type]);

  const sendMessage = async (req, res) => {
    try {
      const response = await axios.post("/api/v1/addmsg", {
        conversationId: conversationId.id,
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
      // console.log(response);
    } catch (err) {
      console.log(err);
      setNewMsg("");
    }
  };

  const sendGroupMessage = async (req, res) => {
    try {
      const response = await axios.post("/api/v1/addgrpmsg/", {
        groupname: conversationId.id,
        sender: usm,
        text: newMsg,
      });

      socket.current.emit("sendGroupMessage", {
        sender: usm,
        text: newMsg,
      });

      setNewMsg("");
      newMessage.current.value = "";
      setIsDone(!isDone);
      // console.log(response);
    } catch (err) {
      console.log(err);
      setNewMsg("");
    }
  };

  useEffect(() => {
    scrollRef?.current.scrollIntoView({ behavior: "smooth", block: "end" });
    // const s = scrollRef.current;
    // s.scrollTop = s.scrollHeight;
  }, [arrivalMsg, sendMessage, grpMsg, setGrpMsg]);

  const getMembersArray = async () => {
    try {
      if (conversationId.type === "private") {
        const response = await axios.get(
          "/api/v1/getspecificconv/" + conversationId.id
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
      if (conversationId.type === "private") {
        sendMessage();
      } else {
        sendGroupMessage();
      }
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
          {conversationId.id && (
            <div
              onClick={() =>{
                setIsProfileOpen({
                  state: !isProfileOpen.state,
                  profile: conversationId.type,
                });
                // console.log(conversationId.type);
              }
              }
              className="selectedUser"
              style={{
                opacity:
                  isProfileOpen.state &&
                  isProfileOpen.profile === "other" &&
                  "0.3",
                cursor: "pointer",
              }}
            >
              {otherName}
            </div>
          )}
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <div className="msgBox" ref={scrollRef}>
                {conversationId.id ? (
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
            {conversationId.id && (
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
