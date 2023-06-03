import React from "react";
import "./message.css";

function Message() {
  return (
    <>
      <div className="message">
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
      </div>

      <div className="message own">
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageText">
            Yeah, I know its a wonderful app and we are adding new features as
            soon as possible keep using it. Thank you.
          </p>
        </div>
        <div className="messageBottom">10 mins ago</div>
      </div>
    </>
  );
}

export default Message;
