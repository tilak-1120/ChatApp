const GroupMessages = require("../models/groupMessagesSchema");

exports.addGroupMessage = async (req, res) => {
  try {
    const newGroupMessage = new GroupMessages({
      groupname: req.body.groupname,
      sender: req.body.sender,
      text: req.body.text,
    });

    const savedMessage = await newGroupMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getGroupMessages = async (req, res) => {
  try {
    const messages = await GroupMessages.find({
      groupname: req.params.groupname,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
    console.log(err + "Can't Find Group");
  }
};
