const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");

// New User
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User
router.get("/getuser/:username", getUser);

module.exports = router;
