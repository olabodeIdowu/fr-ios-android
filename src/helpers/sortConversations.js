export const sortConversations = (conversations) => {
  return conversations.sort((a, b) => {
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    return lastMessageB.time.getTime() - lastMessageA.time.getTime();
  });
};
