export const addConversationToStore = (state, payload) => {
  return payload.map((convo) => {
    convo.unreadCount = countUnreadMessages(convo);

    return convo;
  })  
}

const countUnreadMessages = (conversation) => {
  const messages = conversation.messages;
  const otherUserId = conversation.otherUser.id;
  const readTime = new Date(conversation.otherUser.id === conversation.user1Id ? 
    conversation.user2ReadTime : 
    conversation.user1ReadTime);
  let unreadCount = 0;
    
  for(let message of messages){
    if(message.senderId === otherUserId && new Date(message.createdAt) > readTime){
      unreadCount++;
    }
    else{
      break;
    }
  }

  return unreadCount;
}

export const setReadTimeToStore = (state, payload) => {
  const { recipientId, conversationId, readTime } = payload;
  
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = copyConversation(convo);

      if(convo.user1Id === recipientId){
        convoCopy.user2ReadTime = readTime;
      }
      else{
        convoCopy.user1ReadTime = readTime;
      }

      convoCopy.unreadCount = 0;

      return convoCopy;
    }
    else{
      return convo;
    }
  })
}

const copyConversation = (conversation) => {
  let copy = { ...conversation };

  copy.otherUser = { ...conversation.otherUser };
  
  copy.messages = [];
  for(let message of conversation.messages){
    copy.messages.push({ ...message });
  }

  return copy;
}

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadCount = 1;
    return [newConvo, ...state];
  }
  
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = copyConversation(convo);
      convoCopy.messages.unshift(message);
      convoCopy.latestMessageText = message.text;

      convoCopy.unreadCount = countUnreadMessages(convoCopy);

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = copyConversation(convo);
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = copyConversation(convo);
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
