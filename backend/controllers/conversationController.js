const Conversation = require("../models/conversationSchema");
const User = require("../models/userSchema");

exports.addConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderUser, req.body.receiverUser],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.username] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSpecificConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.convId);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
