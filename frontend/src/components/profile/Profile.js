import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../App";
import "./profile.css";
import OtherProfile from "../otherProfile/OtherProfile";
import axios from "axios";
import GroupProfile from "../groupProfile/GroupProfile";

const Profile = () => {
  const { usm, setIsProfileOpen, isProfileOpen, refresh, conversationId } = useContext(userContext);

  const [isEditOpen, setisEditOpen] = useState(false);
  const [about, setabout] = useState("");
  const newEditContent = useRef();
  const [newimg, setNewImg] = useState(false);
  const [imginp, setImgInp] = useState(false);
  const [files, setFiles] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  function handelClick() {
    axios.put("api/v1/updateabout", {
      username: usm,
      about: newEditContent.current.value,
    });
  }

  const handelUpload = () => {
    const formdata = new FormData();
    formdata.append("photo", files);
    formdata.append("username", usm);
    // console.log(formdata);
    axios.post("/api/v1/setProfilePicture", formdata).then((Response) => {
      console.log(Response);
    });
  };

  const removeProfilePicture = async (req, res) => {
    await axios.put("/api/v1/removeProfilePicture/" + usm);

  };

  useEffect(() => {
    if (usm) {
      if(conversationId.type === "private")
      axios.get("/api/v1/getuser/" + usm).then((response) => {
        // console.log(response.data.about);
        setabout(response.data.about);
        setProfilePic(response.data.profilePicture);
      });
    }
  }, [
    setisEditOpen,
    isEditOpen,
    newimg,
    setImgInp,
    handelUpload,
    setNewImg,
    about,
    setabout,
    refresh,
  ]);

  if(isProfileOpen.profile === "group"){
    return <GroupProfile />;
  }

  if (isProfileOpen.profile === "private") {
    return <OtherProfile />;
  }

  if (imginp) {
    return (
      <div className="chooseImg">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          placeholder="Select File"
          className="input"
          name="photo"
          onChange={(event) => setFiles(event.target.files[0])}
        />
        <div className="buttons">
          <button
            className="addButton"
            type="submit"
            onClick={(e) => {
              setImgInp(!imginp);
              setNewImg(!newimg);
              handelUpload();
            }}
          >
            Done
          </button>
          <button
            className="backButton"
            onClick={() => {
              setImgInp(!imginp);
              setNewImg(!newimg);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return isEditOpen ? (
    <div className="editAboutmain">
      <input
        type="text"
        className="input"
        placeholder={!about ? "Enter Your About Content [0-100]" : about}
        style={{ margin: "auto", marginBottom: "40px" }}
        ref={newEditContent}
        maxLength={100}
      />
      <button
        className="editButton"
        onClick={() => {
          setisEditOpen(!isEditOpen);
          handelClick();
        }}
      >
        Edit
      </button>
    </div>
  ) : (
    <div className="top">
      <div className="closebar">
        <svg
          className="closeButton"
          onClick={() =>
            setIsProfileOpen({
              state: !isProfileOpen,
              profile: "own",
            })
          }
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>
      <div className="prof-pic">
        <img
          src={profilePic}
          alt="Loading..."
          className="profImg"
          onClick={() => setNewImg(!newimg)}
        />
        {newimg && (
          <div style={{ display: "flex", gap: "30px" }}>
            <p className="newphoto" onClick={() => setImgInp(!imginp)}>
              Add Profile Picture
            </p>
            {profilePic !== "../uploads/default.jpg" && (
              <p
                className="newphoto"
                onClick={() => {
                  setProfilePic("../uploads/default.jpg");
                  removeProfilePicture();
                }}
              >
                Remove Profile Picture
              </p>
            )}
          </div>
        )}
      </div>
      <div className="usm">
        <h2>{usm}</h2>
      </div>
      <span className="abtlabel">ABOUT:</span>
      <div className="about">
        <p className="aboutContent">
          {about ? (
            about
          ) : (
            <p className="aboutPara">Tell Something About You...!!!</p>
          )}
        </p>
        <div className="p">
          <svg
            onClick={() => setisEditOpen(!isEditOpen)}
            className="pencil"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Profile;
