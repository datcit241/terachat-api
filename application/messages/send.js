const Model = require('../../models');
async function send({userId, conversationId, text}) {
  const conversation = await Model['Conversation'].findOne({
    where: {
      id: conversationId
    }
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const sender = await Model['User'].findByPk(userId);

  if (!sender) {
    throw new Error('User not found');
  }

  const message = await Model['Message'].create({
    text
  });

  await message.setUser(sender);
  await message.setConversation(conversation);
  message.save();

  return message;
}

module.exports = send;