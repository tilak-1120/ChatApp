const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userName, socketId) => {
  !users.some((user) => user.userName === userName) &&
    users.push({ userName, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return users.find((user) => userName === user.userName);
};

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("addUser", (userName) => {
    addUser(userName, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ sender, receiver, text }) => {
    const user = getUser(receiver);
    io.to(user.socketId).emit("getMessage", {
      sender,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
