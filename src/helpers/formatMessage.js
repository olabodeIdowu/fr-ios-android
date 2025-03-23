export default function formatMessage(msg, userID, thisConversationID) {
  return {
    message: msg,
    userID: userID,
    conversationID: thisConversationID,
    time: new Date().toString(),
  };
}
