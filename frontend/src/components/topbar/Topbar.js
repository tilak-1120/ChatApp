import React from "react";
import "./topbar.css";

function Topbar() {
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">ChatApp</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <input placeholder="Search for friends" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
