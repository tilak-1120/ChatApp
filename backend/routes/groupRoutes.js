const router = require("express").Router();
const {
  newGroup,
  updateGroup,
  getGroups,
  getSpecificGroup,
  editGroupMember,
  deleteGroup,
} = require("../controllers/groupController");

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

module.exports = router;
