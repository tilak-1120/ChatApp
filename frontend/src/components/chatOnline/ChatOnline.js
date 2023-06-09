import React, { useContext } from "react";
import "./chatOnline.css";
import { userContext } from "../../App";
import Profile from "../profile/Profile";

function ChatOnline() {
  const { usersOnline, usm, isProfileOpen } = useContext(userContext);
  const users = usersOnline.filter((key) => {
    return key.userName !== "" && key.userName !== usm;
  });
  console.log(usersOnline);
  return isProfileOpen ? (
    <Profile />
  ) : (
    <>
      <div className="chatOnline">
        <div className="addconv">
          <label className="addconvLabel">Online Friends</label>
        </div>

        {users.map((key) => {
          return (
            <div className="chatOnlineFriend">
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{key.userName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChatOnline;
