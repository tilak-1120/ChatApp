const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use('/uploads' , express.static(__dirname+'/uploads'));

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const userRoute = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const messageRoute = require("./routes/messageRoutes");

// Routes Import
app.use("/api/v1", userRoute);
app.use("/api/v1", conversationRoute);
app.use("/api/v1", messageRoute);

module.exports = app;
