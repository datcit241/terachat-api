const Model = require("../../models");
async function list(conversationId) {
  const conversation = await Model['Conversation'].findOne({
    where: { conversationId },
    include: Model['Message']
  });

  if (!conversation) return null;

  return conversation.messages;
}

module.exports = list;
