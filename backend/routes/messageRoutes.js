const router = require("express").Router();
const {
  addMessage,
  getMessages,
  deleteMessages,
  deleteSpecificMessage,
} = require("../controllers/messageController");

// New Message
router.post("/addmsg", addMessage);

// Get Message
router.get("/getmsg/:conversationId", getMessages);

// Delete messages
router.delete("/deleteMessages/:convId", deleteMessages);

// Delete specific message
router.delete("/deleteSpecificMessage/:msgId", deleteSpecificMessage);

module.exports = router;
