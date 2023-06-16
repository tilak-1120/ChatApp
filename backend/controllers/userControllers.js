const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.registerUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ username: req.body.username });

    if (userExist) {
      alert("User Already Registered");
      return res.status(422).json("Already Registered");
    }

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("Invalid Credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword
      ? alert("Login Unsuccessfull Invalid Credentials")
      : res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // !user ? alert("Username doesn't exists") : res.status(200).json(user);

    if (user) {
      res.status(200).json(user);
    } else {
      console.log("Username doesn't exists");
      res.status(404).json("Username doesn't exists");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { about, username } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json("User does not exists");
    }

    const updateAbout = await User.updateOne(
      { username: username },
      { $set: { about: about } }
    );

    res.status(200).json(updateAbout);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.setProfilePic = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extention = parts[parts.length - 1];
    const newpath = path + "." + extention;
    fs.renameSync(path, newpath);

    const response = await User.updateOne(
      { username: req.body.username },
      { $set: { profilePicture: newpath } }
    );

    if (!response) {
      return console.log("Can't update profilepic");
    }
    res.status(200).json("Profile picture updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeProfilePicture = async (req, res) => {
  try {
    const response = await User.updateOne(
      { username: req.params.username },
      { $set: { profilePicture: "../uploads/default.jpg" } }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
