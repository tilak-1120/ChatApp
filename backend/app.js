const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./routes/userRoutes");

// Routes Import
app.use("/api/v1", userRoute);

module.exports = app;
