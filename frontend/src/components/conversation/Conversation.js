import React, { useContext, useEffect } from "react";
import "./conversation.css";
import { userContext } from "../../App";
import AddConversation from "../addConversation/AddConversation";
import axios from "axios";

function Conversation() {
  const {
    usm,
    isOpen,
    setIsOpen,
    setConversationId,
    conv,
    setConv,
    setOtherName,
    setisProfileOpen,
    isProfileOpen
  } = useContext(userContext);
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
  }, [isOpen]);

  return isOpen ? (
    <AddConversation />
  ) : (
    <>
      <div className="username"
        onClick={()=>setisProfileOpen(!isProfileOpen)}
      >{usm}</div>
      <div className="addconv">
        <label className="addconvLabel">Add Friends</label>
        <button className="addconvButton" onClick={() => setIsOpen(!isOpen)}>
          +
        </button>
      </div>

      {/* <input className="input" type="text" placeholder="Search friends...!!" /> */}

      {conv.map((key) => {
        return (
          <div
            className="conversation"
            onClick={() => {
              setConversationId(key._id);
              const n = key.members.filter((elm) => {
                return elm !== usm;
              });
              setOtherName(n);
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
