const router = require("express").Router();
const User = require('../models/userSchema')
const {
  registerUser,
  loginUser,
  getUser,
  getUserDetail,
  updateAbout,
  removeProfilePicture,
} = require("../controllers/userControllers");

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
var type = upload.single('photo');


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

//profile picture
router.post("/setProfilePicture" , type , async(req,res)=>{
  const{originalname,path} = req.file;
  const parts = originalname.split('.');
  const extention = parts[parts.length -1];
  const newpath = path +'.'+ extention;
  fs.renameSync(path , newpath);
  try{
    const Response = await User.updateOne({username: req.body.username},{$set: {profilePicture: newpath}});
    res.status(200);
  }catch(err){
    res.status(500).json(err);
  }
})

//remove profile picture
router.get("/removeProfilePicture/:usm" , removeProfilePicture)


module.exports = router;
