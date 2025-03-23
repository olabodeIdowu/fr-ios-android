import { Conversation, SupabaseConversation, Message } from "../types";

const randomIntBetweenOneAndFour = Math.floor(Math.random() * 5);

export default function formatConversation(conversationsResponse) {
  const messages = conversationsResponse.messages
    ? conversationsResponse.messages.map((msg) => {
        const formattedMessage = {
          id: msg.id,
          message: msg.title,
          time: msg.time,
          userID: msg.userID,
          conversationID: msg.conversationID,
          isRead: false,
        };
        return formattedMessage;
      })
    : [];
  return {
    id: conversationsResponse.id,
    messages: messages ? messages : [],
    users: [conversationsResponse.owner_user_id],
    time: conversationsResponse.time,
    randomProfilePicture: randomIntBetweenOneAndFour,
    participants: conversationsResponse.participants.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    })),
  };
}
