const Model = require("../../models");
async function leave({userId, conversationId}) {
  const user = await Model["User"].findByPk(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const conversation = await Model["Conversation"].findByPk(conversationId);
  if (!conversation) {
    const err = new Error('Conversation not found');
    err.status = 404;
    throw err;
  }

  const members = await conversation.getUsers();
  if (members.length === 3) {
    const err = new Error("You can't leave the conversation");
    err.status = 400;
    throw err;
  }

  await user.removeConversation(conversation);
}

module.exports = leave;