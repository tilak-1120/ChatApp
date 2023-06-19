import React, { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { userContext } from "../../App";
import AddConversation from "../addConversation/AddConversation";
import AddGroup from "../addGroup/AddGroup";
import axios from "axios";

function Conversation() {
  const {
    usm,
    isOpen,
    setIsOpen,
    setConversationId,
    conv,
    setConv,
    otherName,
    setOtherName,
    setIsProfileOpen,
    isProfileOpen,
    refresh,
    setRefresh,
    unseenMsgs,
    setUnseenMsgs,
  } = useContext(userContext);

  const [photos, setPhotos] = useState([]);
  const [usmimg, setUsmImg] = useState("");
  const [grp, setGrp] = useState([]);
  const [isGrpUpdateOpen, setisGrpUpdateOpen] = useState(false);

  var names = [];

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

  const getGroups = async (req, res) => {
    try {
      if (usm) {
        const response = await axios.get("/api/v1/getgroups/" + usm);
        setGrp(response.data);
        // console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPhotos = async (req, res) => {
    try {
      names.map(async (elm) => {
        const response = await axios.get("/api/v1/getuser/" + elm);
        setPhotos((prev) => {
          return [...prev, response.data.profilePicture];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserProfilePicture = async (req, res) => {
    try {
      const getImage = await axios.get("/api/v1/getuser/" + usm);
      setUsmImg(getImage.data.profilePicture);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getConv();
    getPhotos();
    getGroups();
  }, []);

  useEffect(() => {
    getConv();
    getPhotos();
    getGroups();
  }, [isOpen, refresh, setPhotos, isGrpUpdateOpen]);

  useEffect(() => {
    getUserProfilePicture();
  }, [isProfileOpen, refresh]);

  if (isGrpUpdateOpen) {
    return (
      <div>
        <AddGroup set={setisGrpUpdateOpen} />
      </div>
    );
  }

  return isOpen ? (
    <AddConversation />
  ) : (
    <>
      <div
        className="username"
        onClick={() =>
          setIsProfileOpen({
            state: !isProfileOpen.state,
            profile: "own",
          })
        }
      >
        <img className="profileImg" src={usmimg} alt="" />
        {usm}
      </div>
      <div className="addconv">
        {/* <div>
          <label className="addconvLabel">Add Friends</label>
        </div> */}
        <div className="btns">
          <button className="addconvButton" onClick={() => setIsOpen(!isOpen)}>
            Add Friends
          </button>
          <button
            className="addconvButton"
            onClick={() => setisGrpUpdateOpen(!isGrpUpdateOpen)}
          >
            Add Group
          </button>
          <button
            className="refreshButton"
            onClick={() => {
              setRefresh(!refresh);
              setPhotos([]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <style>{`svg{fill:#ffffff;}`}</style>
              <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" />
            </svg>
          </button>
        </div>
      </div>

      {/* <input className="input" type="text" placeholder="Search friends...!!" /> */}

      {grp.map((key) => {
        return (
          <div
            className="conversation"
            onClick={() => {
              setConversationId({
                id: key.groupname,
                type: "group",
              });
              setOtherName(key.groupname);
              setIsProfileOpen({
                state: false
              })
            }}
          >
            <img className="conversationImg" src={key.groupProfile} alt="" />
            <span className="conversationName">{key.groupname}</span>
          </div>
        );
      })}

      {conv.map((key, index) => {
        names.push(
          key.members.filter((elm) => {
            return elm !== usm;
          })
        );
        return (
          <div
            className="conversation"
            onClick={() => {
              setConversationId({
                id: key._id,
                type: "private",
              });
              const n = key.members.filter((elm) => {
                return elm !== usm;
              });
              setOtherName(n);
              (unseenMsgs.includes(key.members[1] === usm ? key.members[0] : key.members[1]) &&
              !otherName === key.members[1] === usm ? key.members[0] : key.members[1]) && setUnseenMsgs(prev=>{
                return prev.filter(elm=>{
                  return elm !== (key.members[1] === usm ? key.members[0] : key.members[1])
                })
              });
              
              setIsProfileOpen({
                state: false
              })
            }}
          >
            <img className="conversationImg" src={photos[index]} alt="" />
            <span className="conversationName">
              {key.members[1] === usm ? key.members[0] : key.members[1]}
              {unseenMsgs.includes(key.members[1] === usm ? key.members[0] : key.members[1]) && <div className="newmsgs"></div>}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default Conversation;
