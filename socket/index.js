const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userName, socketId) => {
  !users.some((user === user.userName) === userName) &&
    users.push({ userName, socketId });
};

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("addUser", (userName) => {});
});
