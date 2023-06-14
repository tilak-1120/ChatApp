const mongoose = require("mongoose");
const validator = require("validator");

const GroupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    groupadmin: {
      type: String,
      require: true,
    },
    groupmembers: {
      type: Array,
      default: [],
    },
    groupProfile: {
      type: String,
      default: "../uploads/groupDefault.png",
    },
    groupAbout: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
