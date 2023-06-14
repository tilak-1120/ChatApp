import React, { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { userContext } from "../../App";
import AddConversation from "../addConversation/AddConversation";
import axios from "axios";
import AddGroup from "../addGroup/AddGroup";

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
    isProfileOpen,
    refresh,
    setRefresh,
  } = useContext(userContext);

  const [photos, setPhotos] = useState([]);
  const [usmimg, setUsmImg] = useState("");
  const [grp, setGrp] = useState([]);
  const [isGrpUpdateOpen , setisGrpUpdateOpen] = useState(false);

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
        console.log(response);
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
  }, [isOpen, refresh, setPhotos]);

  useEffect(() => {
    getUserProfilePicture();
  }, [isProfileOpen, refresh]);

  if(isGrpUpdateOpen){
    return <div>
      <AddGroup 
        set = {setisGrpUpdateOpen}
      />
    </div>
  }

  return isOpen ? (
    <AddConversation />
  ) : (
    <>
      <div
        className="username"
        onClick={() => setisProfileOpen({
          state: true,
          profile: "own"
        })}
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
          <button className="addconvButton"
            onClick={()=>setisGrpUpdateOpen(!isGrpUpdateOpen)}
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
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <style>{`svg{fill:#ffffff;}`}</style>
            <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
          </svg>
          </button>
        </div>
      </div>

      {/* <input className="input" type="text" placeholder="Search friends...!!" /> */}

      {grp.map((key) => {
        return (
          <div className="conversation">
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
              setConversationId(key._id);
              const n = key.members.filter((elm) => {
                return elm !== usm;
              });
              setOtherName(n);
            }}
          >
            <img className="conversationImg" src={photos[index]} alt="" />
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
