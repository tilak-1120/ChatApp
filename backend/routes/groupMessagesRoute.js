const router = require("express").Router();
const {
  addGroupMessage,
  getGroupMessages,
} = require("../controllers/groupMessageController");

// New Group Message
router.post("/addgrpmsg", addGroupMessage);

// Get Group Messages
router.get("/getgrpmsg/:groupname", getGroupMessages);

module.exports = router;
