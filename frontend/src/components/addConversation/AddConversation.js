import React, { useContext, useRef } from "react";
import "./addConversation.css";
import axios from "axios";
import { userContext } from "../../App";

function AddConversation() {
  const receiverUser = useRef();
  const { setIsOpen, usm, conv } = useContext(userContext);
  const groupName = useRef();
  const memberName = useRef();
  const newMemberName = useRef();
  const newGroupName = useRef();

  const addConv = async (req, res) => {
    try {
      // console.log(receiverUser.current.value);

      const findUser = await axios.get(
        "/api/v1/getuser/" + receiverUser.current.value
      );

      var convUsers = [];
      if (findUser) {
        conv.map((key) => {
          key.members.filter((elm) => {
            if (elm !== usm) {
              let m = elm;
              convUsers.push(m);
            }
          });
        });
      }

      if (findUser.status === 404) {
        alert("Invalid Username");
      } else {
        if (convUsers.length !== 0) {
          // console.log("Inside findUser");
          // console.log(convUsers);
          convUsers.find((user) => user === receiverUser.current.value) &&
            alert("This friend already exists");
        }
      }

      // console.log("Inside post conv");

      const response = await axios.post("/api/v1/addconv", {
        senderUser: usm,
        receiverUser: receiverUser.current.value,
      });

      if (response) {
        // console.log(response.data._id);
        alert("New Friend Added Successfully");
        setIsOpen(false);
      } else {
        alert("User doesn't exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addGroup = async (req, res) => {
    try {
      const findGroup = await axios.get(
        "/api/v1/getspecificgroup/" + groupName.current.value
      );

      const findMember = await axios.get(
        "/api/v1/getuser/" + memberName.current.value
      );

      // console.log(findGroup.status);
      // console.log(findMember);

      if (findGroup && findMember) {
        const updateGroup = await axios.put(
          "/api/v1/updategroup/" + groupName.current.value,
          {
            groupmembers: memberName.current.value,
          }
        );
        console.log(updateGroup);
        alert("New Member Added Successfully");
      }

      if (findGroup.status === 404 || findMember.status === 404) {
        alert("Invalid Details");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createGroup = async (req, res) => {
    try {
      const findMember = await axios.get(
        "/api/v1/getuser/" + newMemberName.current.value
      );

      // console.log(findGroup.status);
      // console.log(findMember);

      if (findMember) {
        const addGroup = await axios.post("/api/v1/addgroup", {
          groupname: newGroupName.current.value,
          groupadmin: usm,
          groupmembers: [newMemberName.current.value],
        });
        console.log(addGroup);
        alert(
          "New Group Created and Member Added Successfully. You're the group Admin"
        );
      }

      if (findMember.status === 404) {
        alert("Invalid Details");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    addConv();
  };

  const handleGroupClick = (e) => {
    e.preventDefault();
    addGroup();
    console.log(groupName.current.value + " " + memberName.current.value);
  };

  const handleNewGroupClick = (e) => {
    e.preventDefault();
    createGroup();
  };

  return (
    <>
      <div className="addconvMain">
        <input
          className="input"
          type="text"
          placeholder="Enter Username"
          ref={receiverUser}
        />
        <div className="buttons">
          <button className="addButton" onClick={handleClick}>
            Add
          </button>
          <button
            className="backButton"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div>

      <div className="addconvMain">
        <input
          className="input"
          type="text"
          placeholder="Create Group"
          ref={newGroupName}
        />
        <input
          className="input"
          type="text"
          placeholder="Add Member"
          ref={newMemberName}
        />
        <div className="buttons">
          <button className="addButton" onClick={handleNewGroupClick}>
            Create Group
          </button>
          <button
            className="backButton"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div>

      <div className="addconvMain">
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
          <button
            className="backButton"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Back To Chat
          </button>
        </div>
      </div>
    </>
  );
}

export default AddConversation;
