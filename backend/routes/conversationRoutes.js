const router = require("express").Router();
const {
  addConversation,
  getConversation,
  getSpecificConversation,
} = require("../controllers/conversationController");

// New Conversation
router.post("/addconv", addConversation);

// Get Conversation
router.get("/getconv/:username", getConversation);

// Get Specific Conversation
router.get("/getspecificconv/:convId", getSpecificConversation);

module.exports = router;
