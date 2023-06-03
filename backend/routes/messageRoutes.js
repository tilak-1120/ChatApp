const router = require("express").Router();
const { addMessage, getMessages } = require("../controllers/messageController");

// New Message
router.post("/addmsg", addMessage);

// Get Message
router.get("/getmsg/:conversationId", getMessages);

module.exports = router;
