const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

console.log("Socket Server running at port 5000");
let users = [];
let groupUsers = [];

const addGroupUsers = (userName, socketId) => {
  !groupUsers.some((user) => user.userName === userName) &&
    groupUsers.push({ userName, socketId });
};

const removeGroupUsers = (socketId) => {
  groupUsers = groupUsers.filter((user) => user.socketId !== socketId);
};

const addUser = (userName, socketId) => {
  !users.some((user) => user.userName === userName) &&
    users.push({ userName, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// const getUser = (userName) => {
//   return users.find((user) => userName === user.userName);
// };

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("addUser", (userName) => {
    addUser(userName, socket.id);
    io.emit("getUsers", users);
  });

  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   io.to(user.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  socket.on("sendMessage", ({ sender, receiver, text ,_id}) => {
      io.emit("getMessage", {
        sender,
        text,
      });
    // const user = getUser(receiver);
    console.log(receiver);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("addGroupUsers", (userName) => {
    addGroupUsers(userName, socket.id);
    io.emit("getGroupUsers", users);
  });

  socket.on("sendGroupMessage", ({ sender, text }) => {
    // const user = getUser(receiver);
    // console.log(receiver);
    io.emit("getGroupMessage", {
      sender,
      text,
    });
  });

  socket.on("groupDisconnect", () => {
    console.log("Group Disconnected");
    removeGroupUsers(socket.id);
    io.emit("getGroupUsers", groupUsers);
  });
});
