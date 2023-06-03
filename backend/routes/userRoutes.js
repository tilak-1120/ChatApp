const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userControllers");

// New User
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;
