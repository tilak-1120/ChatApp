const router = require("express").Router();
const { addMessage, getMessages, DeleteMessages, deleteSpecificMessage } = require("../controllers/messageController");

// New Message
router.post("/addmsg", addMessage);

// Get Message
router.get("/getmsg/:conversationId", getMessages);

//delete messages
router.delete("/deleteMessages/:convId", DeleteMessages);

//delete specific message
router.delete("/deleteSpecificMessage/:msgId" , deleteSpecificMessage)
module.exports = router;
