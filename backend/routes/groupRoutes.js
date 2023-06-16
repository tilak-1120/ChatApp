const router = require("express").Router();
const {
  newGroup,
  updateGroup,
  getGroups,
  getSpecificGroup,
  editGroupMember,
  deleteGroup,
  setGroupProfilePic,
  removeGroupProfilePic,
  addMembers
} = require("../controllers/groupController");

const upload = require("multer")({ dest: "uploads/" });
var type = upload.single("photo");

// Create Group
router.post("/addgroup", newGroup);

// Update Group
router.put("/updategroup/:groupname", updateGroup);

// Get Groups
router.get("/getgroups/:username", getGroups);

// Get Specific Groups
router.get("/getspecificgroup/:groupname", getSpecificGroup);

// Delete Specific Group Members
router.put("/editgroupmember/:groupname/:membername", editGroupMember);

// Delete Group
router.delete("/deletegroup/:groupname", deleteGroup);

// Set Profile Pic
router.post("/setGroupProfilePicture", type, setGroupProfilePic);

//remove profile picture
router.put("/removeGroupProfilePicture/:GroupName", removeGroupProfilePic);

router.put("/AddMember/:groupName/:newMember" , addMembers)

module.exports = router;
