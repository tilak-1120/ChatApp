import React from "react";
import "./conversation.css";

function Conversation() {
  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <span className="conversationName">Random User</span>
      </div>
    </>
  );
}

export default Conversation;
