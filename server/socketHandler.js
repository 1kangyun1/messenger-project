const { Conversation } = require("./db/models");
const {
  checkOnlineUser,
  removeOnlineUser,
  addOnlineUser,
  getSocketId
} = require("./onlineUsers");

const socketHandler = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.REQUEST_ORIGIN,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    socket.on("go-online", async (id) => {
      if (!checkOnlineUser(id)) {
        addOnlineUser(id, socket.id);
      }

      joinRooms(socket, id);
    });

    socket.on("new-message", (data) => {
      sendMessage(io, socket, data); 
    });

    socket.on("logout", (id) => {
      if (checkOnlineUser(id)) {
        removeOnlineUser(id);
        exitRooms(socket, id);
      }
    });
  });
}

const sendMessage = (io, socket, data) => {
  const message = data.message;
  const room = message.conversationId.toString();

  socket.join(room);
  if(checkOnlineUser(data.recipientId)){
    io.sockets.connected[getSocketId(data.recipientId)].join(room);
  }

  socket.to(room).emit("new-message", {
    message: data.message,
    sender: data.sender,
  });
}

const exitRooms = (socket, userId) => {
  for(let room of socket.rooms){
    socket.to(room).emit("remove-offline-user", userId);
  }
}

const joinRooms = (socket, userId) => {
  Conversation.listConversations(userId)
  .then(conversations => {
    const rooms = conversations.map(conversation => {
      return conversation.id.toString();
    })
    socket.join(rooms);

    for(let room of rooms){
      socket.to(room).emit("add-online-user", userId);
    }
  })
  .catch(err => {
    console.error(err);
  })
}

module.exports = socketHandler;