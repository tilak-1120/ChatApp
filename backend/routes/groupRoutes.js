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
  addMembers,
  editGroupAbout,
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

// Set Group Profile Pic
router.post("/setGroupProfilePicture", type, setGroupProfilePic);

// Remove Group profile picture
router.put("/removeGroupProfilePicture/:GroupName", removeGroupProfilePic);

// Add Group Members
router.put("/addMember/:groupName/:newMember", addMembers);

// Editing Group About
router.put("/editGroupAbout/:groupname", editGroupAbout);

module.exports = router;
