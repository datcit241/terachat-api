const Model = require("../../models");

module.exports = async function ({userId, conversationId, password}) {
  const user = await Model.User.findByPk(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const conversation = await Model.Conversation.findByPk(conversationId);
  if (!conversation) {
    const err = new Error('Conversation not found');
    err.status = 404;
    throw err;
  }

  const countMembers = Model.ConversationMember.count({
    where: {
      ConversationId: conversationId
    }
  });

  if (countMembers === 2) {
    const err = new Error('Conversation is not a group');
    err.status = 400;
    throw err;
  }

  if (!conversation.isPublic) {
    if (conversation.password !== password) {
      const err = new Error('Incorrect password');
      err.status = 400;
      throw err;
    }
  }

  await user.addConversation(conversation);
}
