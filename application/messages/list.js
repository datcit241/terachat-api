const Model = require("../../models");

async function list({userId, conversationId}) {
  const conversation = await Model.Conversation.findByPk(conversationId);

  if (!conversation) {
    const err = new Error("Conversation not found");
    err.status = 404;
    throw err;
  }

  const membership = await Model.ConversationMember.findOne({
    where: {
      UserId: userId,
      ConversationId: conversationId
    }
  });
  if (!membership) {
    const err = new Error("User not have access to this conversation");
    err.status = 403;
    throw err;
  }

  console.log(conversation);
  return await Model.Message.findAll({
    where: {
      ConversationId: conversationId
    },
    order: [["createdAt", "ASC"]]
  })

  // return conversation.Messages;
  // return await conversation.getMessages();
}

module.exports = list;
