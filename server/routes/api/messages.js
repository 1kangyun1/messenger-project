const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { checkOnlineUser } = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
  
    // find a conversation between two users
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // if conversation exists and matches the request info, add it to message and return
    if (conversation && conversation.id === conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // message requested has different conversationId then server
    else if(conversation && conversation.id !== conversationId){
      return res.sendStatus(400);
    }
    else if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
        user1ReadTime: Date.now()
      });
      if (checkOnlineUser(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
