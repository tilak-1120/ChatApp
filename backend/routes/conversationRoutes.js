const router = require("express").Router();
const {
  addConversation,
  getConversation,
} = require("../controllers/conversationController");

// New Conversation
router.post("/addconv", addConversation);

// Get Conversation
router.get("/getconv/:userId", getConversation);

module.exports = router;
