const onlineUsers = {};

const checkOnlineUser = (userId) => {
  return onlineUsers.hasOwnProperty(userId);
}

const removeOnlineUser = (userId) => {
  return delete onlineUsers[userId];
}

const addOnlineUser = (userId, socketId) => {
  return onlineUsers[userId] = socketId;
}

const getSocketId = (userId) => {
  return onlineUsers[userId];
}

module.exports = {
  checkOnlineUser,
  removeOnlineUser,
  addOnlineUser,
  getSocketId
};
