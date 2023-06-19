import React, { useContext, useEffect, useState } from "react";
import "./message.css";
import { userContext } from "../../App";
import axios from "axios";
import { format } from "timeago.js";

function Message() {
  const {
    conversationId,
    usm,
    isDone,
    msg,
    setMsg,
    otherName,
    groupMessage,
    refresh,
    isProfileOpen,
  } = useContext(userContext);
  const [senderImg, setSenderImg] = useState("");
  const [recieverImg, setRecieverImg] = useState("");
  const [groupMemberImage, setGroupMemberImage] = useState([]);
  const [deletemsg , setdeletemsg] = useState(Boolean);

  const getMessages = async (req, res) => {
    try {
      if (conversationId.id) {
        const response = await axios.get("/api/v1/getmsg/" + conversationId.id);
        setMsg(response.data);
        // console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getImages = async (req, res) => {
    try {
      if (conversationId.type === "private") {
        const conversation = await axios.get(
          "/api/v1/getspecificconv/" + conversationId.id
        );

        // console.log(conversation);
        const sender = conversation.data.members[0];
        const receiver = conversation.data.members[1];
        // console.log("sender" + sender);

        if (sender === usm) {
          const senderImage = await axios.get("/api/v1/getuser/" + sender);
          // console.log(senderImage);
          setSenderImg(senderImage.data.profilePicture);
        } else {
          const receiverImage = await axios.get("/api/v1/getuser/" + sender);
          // console.log(receiverImage);
          setRecieverImg(receiverImage.data.profilePicture);
        }

        if (receiver === usm) {
          const senderImage = await axios.get("/api/v1/getuser/" + receiver);
          // console.log(senderImage);
          setSenderImg(senderImage.data.profilePicture);
        } else {
          const receiverImage = await axios.get("/api/v1/getuser/" + receiver);
          // console.log(receiverImage);
          setRecieverImg(receiverImage.data.profilePicture);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupMessages = async (req, res) => {
    try {
      // console.log(conversationId);
      if (conversationId.type === "group") {
        const response = await axios.get(
          "/api/v1/getgrpmsg/" + conversationId.id
        );
        // console.log(response);
        // setGroupMessage(response.data);  
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSenderImage = async () => {
    try {
      // console.log(sender);
      const response = await axios.get("/api/v1/getspecificgroup/" + otherName);
      // console.log(response.data);
      setGroupMemberImage([]);
      setGroupMemberImage([
        response.data[0].groupadmin,
        ...response.data[0].groupmembers,
      ]);

      // console.log(groupMemberImage);

      groupMemberImage.map(async (elm) => {
        const response = await axios.get("api/v1/getuser/" + elm);
        // console.log(response.data.profilePicture);

      });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(getSenderImage("deep"));

  const mainGetFunction = () => {
    if (conversationId.type === "private") {
      getMessages();
      getImages();
    } else {
      getGroupMessages();
      getSenderImage();
    }
  };

  const DeleteSingleMessage = async (id, sender) => {
    if(sender === usm){
      if(window.confirm("Are You Sure You Want To Delete This Message..?")){
        await axios.delete("/api/v1/deleteSpecificMessage/" + id);
        setdeletemsg(!deletemsg);
      }
    }
  }

  useEffect(() => {
    mainGetFunction();
  }, [conversationId.id, isDone, refresh, isProfileOpen.msgdeleted, deletemsg]);

  return conversationId.type === "group" ? (
    <>
      {groupMessage.map((key) => {
        return (
          <div className={key.sender === usm ? "message own" : "message"}>
            <div className="messageTop">
              <img className="messageImg" src="" alt="alt" />
              <div>{key.sender !== usm && key.sender}</div>
              <p className="messageText">{key.text}</p>
            </div>
            <div className="messageBottom">{format(key.createdAt)}</div>
          </div>
        );
      })}
    </>
  ) : (
    <>
      {msg.map((key) => {
        return (
          <div className={key.sender === usm ? "message own" : "message"}
            onDoubleClick={()=>DeleteSingleMessage(key._id, key.sender)}
          >
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
