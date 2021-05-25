const {
  checkOnlineUser,
  removeOnlineUser,
  addOnlineUser
} = require("./onlineUsers");

const socketHandler = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.REQUEST_ORIGIN,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    socket.on("go-online", (id) => {
      if (!checkOnlineUser(id)) {
        addOnlineUser(id);
      }
      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });

    socket.on("new-message", (data) => {
      socket.broadcast.emit("new-message", {
        message: data.message,
        sender: data.sender,
      });
    });

    socket.on("logout", (id) => {
      if (checkOnlineUser(id)) {
        removeOnlineUser(id);
        socket.broadcast.emit("remove-offline-user", id);
      }
    });
  });
}

module.exports = socketHandler;