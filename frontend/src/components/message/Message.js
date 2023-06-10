import React, { useContext, useEffect, useState } from "react";
import "./message.css";
import { userContext } from "../../App";
import axios from "axios";
import { format } from "timeago.js";

function Message() {
  const { conversationId, usm, isDone, msg, setMsg } = useContext(userContext);
  const [senderImg, setSenderImg] = useState("");
  const [recieverImg, setRecieverImg] = useState("");

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

  const getImages = async (req, res) => {
    try {
      const conversation = await axios.get(
        "/api/v1/getspecificconv/" + conversationId
      );

      // console.log(conversation);
      const sender = conversation.data.members[0];
      const receiver = conversation.data.members[1];
      console.log("sender" + sender);

      if (sender === usm) {
        const senderImage = await axios.get("/api/v1/getuser/" + sender);
        console.log(senderImage);
        setSenderImg(senderImage.data.profilePicture);
      } else {
        const receiverImage = await axios.get("/api/v1/getuser/" + sender);
        console.log(receiverImage);
        setRecieverImg(receiverImage.data.profilePicture);
      }

      if (receiver === usm) {
        const senderImage = await axios.get("/api/v1/getuser/" + receiver);
        console.log(senderImage);
        setSenderImg(senderImage.data.profilePicture);
      } else {
        const receiverImage = await axios.get("/api/v1/getuser/" + receiver);
        console.log(receiverImage);
        setRecieverImg(receiverImage.data.profilePicture);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
    getImages();
  }, [conversationId, isDone]);

  return (
    <>
      {msg.map((key) => {
        return (
          <div className={key.sender === usm ? "message own" : "message"}>
            <div className="messageTop">
              <img
                className="messageImg"
                src={key.sender === usm ? senderImg : recieverImg}
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
