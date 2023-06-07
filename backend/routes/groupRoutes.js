const router = require("express").Router();
const {
  newGroup,
  updateGroup,
  getGroups,
  deleteGroup,
} = require("../controllers/groupController");

// Create Group
router.post("/addgroup", newGroup);

// Update Group
router.put("/updategroup/:groupname", updateGroup);

// Get Groups
router.get("/getgroups/:username", getGroups);

// Delete Group
router.delete("/deletegroup/:groupname", deleteGroup);

module.exports = router;
