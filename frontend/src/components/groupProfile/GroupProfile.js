import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import './groupprofile.css';
import axios from 'axios';

const GroupProfile = () => {

    const {otherName, setIsProfileOpen, isProfileOpen, usm, refresh, conv, setRefresh, setConversationId} = useContext(userContext);

    const [groupMembers , setGroupMembers] = useState([]);
    const [groupInfo , setGroupInfo] = useState();
    const [imageEdit , setImageEdit] = useState(false);
    const [imgInp , setImgInp] = useState(false);
    const [files, setFiles] = useState(null);
    const [addMembers, setAddMembers] = useState(false);
    const [updateAdmin, setUpdateAdmin] = useState(false);

    const GetGroupDetails = async (req,res) => {
        try{
            const response = await axios.get("api/v1/getspecificgroup/" + otherName);
            setGroupMembers([response.data[0].groupadmin,...response.data[0].groupmembers]);
            setGroupInfo(response.data[0]);
        }catch(err){
            console.log(err);
        }
    }

    const handelUpload = () => {
        const formdata = new FormData();
        formdata.append("photo", files);
        formdata.append("group", otherName);
        console.log(formdata);
        axios.post("/api/v1/setGroupProfilePicture", formdata).then((Response) => {
          console.log(Response);
        });
    };

    const removeProfilePicture = async (req, res) => {
         await axios.put("/api/v1/removeGroupProfilePicture/" + otherName);
    };

    const handelAddMember = async (e) => {
        console.log(e.target.value);
        if(groupMembers.includes(e.target.value)) alert("Friend Is Already Exists To This Group");
        else{
            if(window.confirm("Are You Sure You Want To Add "+e.target.value+" To "+"'"+otherName+"'"+" Group")){
                try{
                    const response = await axios.put("api/v1/AddMember/"+otherName+"/"+e.target.value);
                    if(response.status === 200){
                        alert("New Member Added Successfully");
                    }
                }catch(err){
                    console.log(err);
                }
            }
        }
    }

    const deleteMember = async (member) => {
        if(window.confirm("Are You Sure You Want To Remove "+"'"+member+"'"+"From "+"'"+otherName+"'"+" Group")){
            try{
                const response = await axios.put("/api/v1/editgroupmember/"+otherName+"/"+member);
                if(response.status === 200){
                    alert(member + " Is Removed From The Group "+"'"+otherName+"'.");
                }
                setRefresh(!refresh);
            }catch(err){
                alert("There Was Error Removing "+"'"+member+"'"+"from "+"'"+otherName+"'")
                console.log(err);
            }
        }
    }

    const DeleteGroup = async () => {
        try{
            if(window.confirm("Are You Sure, You Want To Delete Group "+"''"+otherName+"''")){
                await axios.delete("/api/v1/deletegroup/" + otherName);
                setRefresh(!refresh);
                setConversationId({
                    id: ""
                });
                setIsProfileOpen({
                    state: !isProfileOpen.state
                })
            }
        }catch(err){
            console.log(err);
        }
    };

    const UpdateAdmin = async (e) => {
        try{
            if(window.confirm("By Pressing Ok, You No Longer Will Be Admin Of "+"''"+otherName+"''"+"Group")){
                await axios.put("/api/v1/updateAdmin/"+otherName+"/"+e.target.value+"/"+groupInfo?.groupadmin);
                setRefresh(!refresh);
                setUpdateAdmin(!updateAdmin)
            }
        } catch(err){
            console.log(err);
        }
    }

    const LeaveGroup = async () => {
        if(window.confirm("Are You Sure You Want To Leave "+"''"+otherName+"''"+"Group")){
            try{
                await axios.put("/api/v1/editgroupmember/"+otherName+"/"+usm);
                setRefresh(!refresh);
                setIsProfileOpen({
                    state: !isProfileOpen.state
                })
                setConversationId({
                    id:""
                })
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        GetGroupDetails();
    },[ imgInp, imageEdit, setImgInp, refresh, addMembers]);

    if(updateAdmin){
        return <div className='AddMemberDiv'> 
        <h3 style={{textAlign:'center'}}>Group Members:</h3>
            {groupInfo?.groupmembers.map(elm => {
                return <button className='friends'
                    value={elm}
                    onClick={(e)=>UpdateAdmin(e)}
                >{elm}</button>
            })}
            <button
            className="addconvButton"
            onClick={() => {
              setUpdateAdmin(!updateAdmin);
            }}
          >
            Close
          </button>
        </div>
    }

    if(addMembers){
        return <div className='AddMemberDiv'>
        <h2>Click On Any Friend You Want to Add In This Group</h2>
            {conv.map(elm=>{
                return <button className='friends' 
                    value={elm.members.filter(k=>{
                        return k!==usm})}
                    onClick={(e)=>{
                        handelAddMember(e);
                    }}
                    >{elm.members.filter(k=>{
                    return k!==usm;
                })}</button>
            })}
            <button className='addconvButton'
                onClick={()=>{setAddMembers(!addMembers)}}
            >Go Back</button>
        </div>
    }

    if(imgInp){
        return <div className="chooseImg">
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
              setImgInp(!imgInp);
            //   setNewImg(!newimg);
              handelUpload();
            }}
          >
            Done
          </button>
          <button
            className="backButton"
            onClick={() => {
              setImgInp(!imgInp);
            //   setNewImg(!newimg);
            }}
          >
            Close
          </button>
        </div>
      </div>
    }


    return (
        <div className='GrpProfile'>
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
                <style>{"svg{fill:#11009e}"}</style>
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </div>
            <div className="prof-pic"
                onClick={()=>{
                    usm === groupInfo?.groupadmin && setImageEdit(!imageEdit)
                }}
            >
                <img src={groupInfo?.groupProfile} alt="img" className="profImg" />
                {imageEdit && (
                    <div style={{ display: "flex", gap: "30px" }}>
                        <p className="newphoto"
                        onClick={()=>{setImgInp(!imgInp)}}>
                        Add Profile Picture
                        </p>
                        {groupInfo?.groupProfile !== "../uploads/groupDefault.png" && (
                        <p
                            className="newphoto"
                            onClick={() => {
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
                <h2>{groupInfo?.groupname}</h2>
            </div>
            {groupInfo?.groupadmin === usm && <div className='deleteAndUpdate'>
                <p className='newphoto'
                    onClick={DeleteGroup}
                >Delete Group</p>
                <p className='newphoto'
                    onClick={()=>setUpdateAdmin(!updateAdmin)}
                >Make Admin</p>
            </div>}
            <span className="membersLabel">ABOUT: </span>
            <div className="about">
                <p className="aboutContent">
                {groupInfo?.groupAbout ? (
                    groupInfo?.groupAbout
                ) : (
                    <p className="aboutPara" style={{ color: "gray" }}></p>
                )}
                </p>
                {usm === groupInfo?.groupadmin && 
                    <div className="p">
                        <svg
                            className="pencil"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        
                        >
                            <style>{`svg{fill:#009;}`}</style>
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                        </svg>
                        
                    </div>
                }
            </div>
            <span className='membersLabel'>MEMBERS : {groupInfo?.groupadmin === usm &&<button className='AddMemberBtn'
                onClick={()=>setAddMembers(!addMembers)}
            >Add Friends</button>}</span>
            <div className='Members'>
                {groupMembers.map((elm,index)=>{
                    return <div className='Member'>{elm} 
                      {index===0 ? (<span className='AdminTag'>Admin</span>
                       ):(
                        groupInfo.groupadmin === usm && <span className='AdminTag'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" 
                            viewBox="0 0 640 512" 
                            onClick={()=>deleteMember(elm)}
                            ><style>{`svg{fill:#11009e}`}</style><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                        
                        </span>)}</div>
                })}
            </div>
            {groupInfo?.groupadmin !== usm && 
            <div className='leavegrpDiv'>
                <p className='newphoto'
                    onClick={LeaveGroup}
                >Leave Group</p>
            </div>}
        </div>
    );
};

export default GroupProfile;