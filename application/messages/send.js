const Model = require('../../models');

async function send({userId, conversationId, text}) {
  if (!text) {
    const err = new Error('Text is required');
    err.status = 400;
    throw err;
  }

  const conversation = await Model.Conversation.findByPk(conversationId);

  if (!conversation) {
    const err = new Error('Conversation not found');
    err.status = 404;
    throw err;
  }

  const sender = await Model.User.findByPk(userId);

  if (!sender) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const message = await Model['Message'].create({
    text
  });

  await message.setUser(sender);
  await message.setConversation(conversation);

  return message;
}

module.exports = send;