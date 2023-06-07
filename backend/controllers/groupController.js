const Group = require("../models/groupSchema");

exports.newGroup = async (req, res) => {
  try {
    const groupExist = await Group.findOne({ groupname: req.body.groupname });

    if (groupExist) {
      alert("Groupname Already Exists");
      return res.status(422).json("Group Already Registered");
    }

    const newGroup = new Group({
      groupname: req.body.groupname,
      groupadmin: req.body.groupadmin,
      groupmembers: req.body.groupmembers,
    });

    const group = await newGroup.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const findGroup = await Group.findOne({ groupname: req.params.groupname });

    if (!findGroup) {
      console.log("Group not found");
      return res.status(404).json("Group not found");
    }

    const update = await Group.updateOne(
      { groupname: req.params.groupname },
      { $set: { groupmembers: req.body.groupmembers } },
      { new: true }
    );
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getGroups = async (req, res) => {
  try {
    const findGroups = await Group.find({
      $or: [
        { groupadmin: req.params.username },
        { groupmembers: { $in: [req.params.username] } },
      ],
    });

    if (!findGroups) {
      console.log("Groups not found");
      return res.status(404).json("Groups not found");
    }
    res.status(200).json(findGroups);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const findGroup = await Group.findOne({ groupname: req.params.groupname });

    if (!findGroup) {
      console.log("Group not found");
      return res.status(404).json("Group not found");
    }

    const deleteGroup = await Group.deleteOne({
      groupname: req.params.groupname,
    });
    res.status(200).json(deleteGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};
