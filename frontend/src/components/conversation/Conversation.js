import React, { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { userContext } from "../../App";
import AddConversation from "../addConversation/AddConversation";
import axios from "axios";

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
    usersOnline,
  } = useContext(userContext);

  const [refresh , setRefresh] = useState(Boolean);
  const [photos , setphotos] = useState([]);

  var names =[];
  
  var online = usersOnline.filter(user => names.includes(user.userName));
  // console.log(online);

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

  const getPhotos = async (req,res) => {
    try{
      names.map(async elm => {
        const resposnse = await axios.get("/api/v1/getuser/"+ elm);
        setphotos(prev=>{
          return [...prev , resposnse.data.profilePicture]
        })
      })
    }catch(err){

    }
  }

  useEffect(() => {
    getConv();
    getPhotos();
  }, [isOpen, refresh, setphotos]);

  return isOpen ? (
    <AddConversation />
  ) : (
    <>
      <div className="username"
        onClick={()=>setisProfileOpen(!isProfileOpen)}
      >{usm}</div>
      <div className="addconv">
          <label className="addconvLabel">Add Friends</label>
          <button className="addconvButton" onClick={() => setIsOpen(!isOpen)}>
            +
          </button>
      </div>
      <div className="refresh">
        <button className="addconvButton" style={{paddingTop:'10px',borderRadius:'100%',backgroundColor:'whitesmoke'}}
          onClick={()=>{
            setRefresh(!refresh);
            setphotos([])
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/></svg>
        </button>
      </div>
        

      {/* <input className="input" type="text" placeholder="Search friends...!!" /> */}

      {conv.map((key,index) => {
        names.push(key.members.filter(elm=>{
          return elm !== usm;
        }))
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
            <img
              className="conversationImg"
              src={photos[index]}
              alt=""
            />
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
