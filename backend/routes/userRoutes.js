const router = require("express").Router();
const { registerUser } = require("../controllers/userControllers");

// New User
router.post("/register", registerUser);

module.exports = router;
