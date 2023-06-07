const Model = require("../../models");

module.exports = async function({userId, conversationId}) {
  const conversation = await Model.Conversation.findByPk(conversationId);
  if (!conversation) {
    const err = new Error("Conversation not found");
    err.status = 404;
    throw err;
  }

  const membership = await Mode.ConversationMember.findOne({where: {ConversationId: conversationId, UserId: userId}});
  if (!membership) {
    const err = new Error("User is not a member of this conversation");
    err.status = 400;
    throw err;
  };

  if (!membership.isAdmin) {
    const err = new Error("User is not an admin of this conversation");
    err.status = 403;
    throw err;
  }

  const countMembers = await Model.ConversationMember.count({ConversationId: conversationId});
  if (countMembers <= 2) {
    const err = new Error("Cannot dispose conversation");
    err.status = 400;
    throw err;
  }

  await conversation.dispose();
}