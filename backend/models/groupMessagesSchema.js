const mongoose = require("mongoose");

const GroupMessagesSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    sender: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupMessages", GroupMessagesSchema);
