const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  getname,
} = require("../controllers/userControllers");

// New User
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User
router.post("/getuser", getUser);


module.exports = router;
