const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUserDetail,
  updateAbout,
  setProfilePicture
} = require("../controllers/userControllers");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// New User
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get User
router.post("/getuser", upload.single('file') , getUser);

//get user
router.get("/getuser/:usm" , getUserDetail)

//Upadating users About content
router.put("/updateUserAbout" , updateAbout);


module.exports = router;
