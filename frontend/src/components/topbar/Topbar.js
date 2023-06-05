import React from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">ChatApp</span>
        </div>
        <div className="topbarCenter">
          {/* <div className="searchbar">
            <input placeholder="Search for friends" className="searchInput" />
          </div> */}
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink" onClick={handleClick}>
              Sign Out
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
