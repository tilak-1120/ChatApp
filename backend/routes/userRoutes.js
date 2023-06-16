const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateAbout,
  setProfilePic,
  removeProfilePicture,
} = require("../controllers/userControllers");

const upload = require("multer")({ dest: "uploads/" });
var type = upload.single("photo");

// New User
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User
router.get("/getuser/:username", getUser);

// Update About Section
router.put("/updateabout", updateAbout);

// Set Profile Pic
router.post("/setProfilePicture", type, setProfilePic);

// Remove Profile Pic
router.put("/removeProfilePicture/:username", removeProfilePicture);

module.exports = router;
