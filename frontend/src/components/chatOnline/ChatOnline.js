import React, { useContext, useEffect, useState } from "react";
import "./chatOnline.css";
import { userContext } from "../../App";
import Profile from "../profile/Profile";
import axios from "axios";

function ChatOnline() {
  const { usersOnline, usm, isProfileOpen, conv, refresh } =
    useContext(userContext);
  const [onlineProfilePics, setOnlineProfilePics] = useState([]);

  var allConvs = [];
  var usersNames = [];

  usersOnline.map((key) => {
    key.userName !== "" && usersNames.push(key.userName);
  });

  conv.map((key) => {
    allConvs.push(key.members[0] === usm ? key.members[1] : key.members[0]);
  });

  const getCommonElements = () => {
    return usersNames.filter((user) => allConvs.includes(user));
  };

  // console.log(usersNames);
  // console.log(allConvs);
  var online = getCommonElements();
  // console.log(online);

  const users = online.filter((key) => {
    return key.userName !== "" && key.userName !== usm;
  });

  const getOnlineProfilepic = () => {
    try {
      users.map(async (key) => {
        const res = await axios.get("/api/v1/getuser/" + key);
        // console.log(res.data.profilePicture);
        setOnlineProfilePics((prev) => [...prev, res.data.profilePicture]);
        console.log(onlineProfilePics);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOnlineProfilepic();
    setOnlineProfilePics([]);
  }, [refresh]);

  return isProfileOpen.state ? (
    <Profile />
  ) : (
    <>
      <div className="chatOnline">
        <div className="addconv">
          <label className="addconvLabel">Online Friends</label>
        </div>

        {users.map((key, index) => {
          return (
            <div className="chatOnlineFriend">
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={onlineProfilePics[index]}
                  alt="image"
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{key}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChatOnline;
