const Model = require("../../models");
async function leave({userId, conversationId}) {
  const user = await Model["User"].findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const conversation = await Model["Conversation"].findByPk(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  await user.removeConversation(conversation);
}

module.exports = leave;