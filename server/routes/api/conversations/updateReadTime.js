const router = require("express").Router();
const { Conversation } = require("../../../db/models");

router.post("/", async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const senderId = req.user.id;
  const { recipientId, conversationId, readTime } = req.body;

  if(!recipientId || !conversationId || !readTime){
    return res.sendStatus(400);
  }

  const response = await Conversation.findConversation(
    senderId,
    recipientId
  ).then((conversation) => {
    if(!conversation){
      return { error: 'unable to find a conversation' };
    }
    else if(conversation.id !== conversationId){
      return { error: 'conversation id does not match with the request' };
    }

    if(conversation.user1Id === senderId){
      conversation.update({
        user1ReadTime: readTime
      });
    }
    else{
      conversation.update({
        user2ReadTime: readTime
      });
    }
    
    return { success: 'Last read time for user has been updated' };
  })
  .catch(err => {
    console.error(err);
  });

  if(response.error){
    res.sendStatus(400);
  }

  res.json(response);
});

module.exports = router;