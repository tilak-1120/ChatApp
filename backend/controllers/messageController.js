const Message = require("../models/messageSchema");

exports.addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.DeleteMessages = async (req,res) => {
  try{
    const response = await Message.deleteMany({conversationId: req.params.convId});
    res.status(200).json(response);
  }catch(err){
    res.status(500).json(err);
  }
};

exports.deleteSpecificMessage = async (req,res) => {
  try{
    const response = await Message.findByIdAndDelete(req.params.msgId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
