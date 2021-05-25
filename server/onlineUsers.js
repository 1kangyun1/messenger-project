const onlineUsers = new Set();

const checkOnlineUser = (id) => {
  return onlineUsers.has(id);
}

const removeOnlineUser = (id) => {
  return onlineUsers.delete(id);
}

const addOnlineUser = (id) => {
  return onlineUsers.add(id);
}

module.exports = {
  checkOnlineUser,
  removeOnlineUser,
  addOnlineUser
};
