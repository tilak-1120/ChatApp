const Group = require("../models/groupSchema");
const fs = require("fs");

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
      { $push: { groupmembers: req.body.groupmembers } },
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

exports.getSpecificGroup = async (req, res) => {
  try {
    const findGroup = await Group.findOne({
      groupname: req.params.groupname,
    });

    if (!findGroup) {
      console.log("Group not found");
      return res.status(404).json("Group not found");
    }
    res.status(200).json(findGroup);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editGroupMember = async (req, res) => {
  try {
    const findGroup = await Group.updateOne(
      { groupname: req.params.groupname },
      { $pull: { groupmembers: req.params.membername } },
      { new: true }
    );
    res.status(200).json(findGroup);
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

exports.setGroupProfilePic = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extention = parts[parts.length - 1];
    const newpath = path + "." + extention;
    fs.renameSync(path, newpath);

    const response = await Group.updateOne(
      { groupname: req.body.group },
      { $set: { groupProfile: newpath } }
    );

    res.status(200).json("Profile picture updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeGroupProfilePic = async (req, res) => {
  try {
    const response = await Group.updateOne(
      { groupname: req.params.GroupName },
      { $set: { groupProfile: "../uploads/groupDefault.png" } }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addMembers = async (req, res) => {
  try {
    const response = await Group.updateOne(
      { groupname: req.params.groupName },
      { $push: { groupmembers: req.params.newMember } },
      { new: true }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editGroupAbout = async (req, res) => {
  try {
    const findGroup = await Group.findOne({ groupname: req.params.groupname });

    if (!findGroup) {
      console.log("Group not found");
      return res.status(404).json("Group not found");
    }

    const editGroupAbout = await Group.updateOne(
      {
        groupname: req.params.groupname,
      },
      { $set: { groupAbout: req.body.groupAbout } }
    );

    res.status(200).json(editGroupAbout);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateGroupAdmin = async (req, res) => {
  try {
    const response = await Group.updateOne(
      { groupname: req.params.grpName },
      { $set: { groupadmin: req.params.newAdmin } },
      { new: true }
    );
    await Group.updateOne(
      { groupname: req.params.grpName },
      { $push: { groupmembers: req.params.usm } }
    );
    await Group.updateOne(
      { groupname: req.params.grpName },
      { $pull: { groupmembers: req.params.newAdmin } }
    );

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
