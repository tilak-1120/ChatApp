const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

const userRoute = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const messageRoute = require("./routes/messageRoutes");
const groupRoute = require("./routes/groupRoutes");
const groupMessageRoute = require("./routes/groupMessagesRoute");

// Routes Import
app.use("/api/v1", userRoute);
app.use("/api/v1", conversationRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1", groupRoute);
app.use("/api/v1", groupMessageRoute);

module.exports = app;
