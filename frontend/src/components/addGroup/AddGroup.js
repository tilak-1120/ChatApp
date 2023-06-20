import React, { useRef, useContext, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import "./addGroup.css";

const AddGroup = (props) => {
  const { usm } = useContext(userContext);
  const [isFocus, setIsFocus] = useState(false);
  const groupName = useRef();
  const memberName = useRef();
  const newMemberName = useRef();
  const newGroupName = useRef();

  // const addGroup = async (req, res) => {
  //   try {
  //     try {
  //       const findGroup = await axios.get(
  //         "/api/v1/getspecificgroup/" + groupName.current.value
  //       );

  //       const findMember = await axios.get(
  //         "/api/v1/getuser/" + memberName.current.value
  //       );

  //       // if (findGroup.status === 404 || findMember.status === 404) {
  //       //   return alert("Invalid Details");
  //       // }
  //     } catch (err) {
  //       // alert("Groupname or Membername doesn't exists. Try a different one.");
  //       console.log(err);
  //     }

  //     const updateGroup = await axios.put(
  //       "/api/v1/updategroup/" + groupName.current.value,
  //       {
  //         groupmembers: memberName.current.value,
  //       }
  //     );
  //     console.log(updateGroup);
  //     groupName.current.value = "";
  //     memberName.current.value = "";
  //     alert("New Member Added Successfully");
  //   } catch (err) {
  //     alert("Groupname or Membername doesn't exists. Try a different one.");
  //     console.log(err);
  //   }
  // };

  const createGroup = async (req, res) => {
    try {
      try {
        const findGroup = await axios.get(
          "/api/v1/getspecificgroup/" + newGroupName.current.value
        );

        // const findMember = await axios.get(
        //   "/api/v1/getuser/" + newMemberName.current.value
        // );
        // console.log(findGroup);
        // console.log(findMember);
      } catch (err) {
        // alert("Try a different groupname or membername");
        console.log(err);
      }

      const addGroup = await axios.post("/api/v1/addgroup", {
        groupname: newGroupName.current.value,
        groupadmin: usm,
        groupmembers: [newMemberName.current.value],
      });
      console.log(addGroup);
      alert(
        "New Group Created and Member Added Successfully. You're the group Admin"
      );
      newGroupName.current.value = "";
      newMemberName.current.value = "";
    } catch (err) {
      alert("Try a different groupname or membername");
      console.log(err);
    }
  };

  // const handleGroupClick = (e) => {
  //   e.preventDefault();
  //   addGroup();
  //   // if ((groupName.current.value && memberName.current.value) !== "") {
  //   //   return props.set(false);
  //   // }
  // };

  const handleNewGroupClick = (e) => {
    e.preventDefault();
    createGroup();
    // if (
    //   newGroupName.current.value !== "" &&
    //   newMemberName.current.value !== ""
    // ) {
    //   return props.set(false);
    // }
  };

  return (
    <div>
      <div className="addconvMain">
        {isFocus && (
          <h2>
            After Creating Group You Can Add Members To The Group From Profile.
          </h2>
        )}
        <input
          className="input"
          type="text"
          placeholder="Create Group"
          ref={newGroupName}
          onFocus={() => setIsFocus(!isFocus)}
        />
        {/* <input
          className="input"
          type="text"
          placeholder="Add Member"
          ref={newMemberName}
        /> */}
        <div className="buttons">
          <button className="addButton" onClick={handleNewGroupClick}>
            Create Group
          </button>
          <button
            className="backButton"
            onClick={() => {
              return props.set(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div>

      {/* <div className="addconvMain">
        <input
          className="input"
          type="text"
          placeholder="Add To Group"
          ref={groupName}
        />
        <input
          className="input"
          type="text"
          placeholder="Add Member"
          ref={memberName}
        />
        <div className="buttons">
          <button className="addButton" onClick={handleGroupClick}>
            Add To Group
          </button>
        </div>
        <div className="closebtn">
          <button
            className="backButton"
            onClick={() => {
              return props.set(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AddGroup;
