const Model = require("../../models");

module.exports = async function({userId, conversationId}) {
  const conversation = await Model.Conversation.findByPk(conversationId);
  if (!conversation) {
     const err = new Error("Conversation not found");
     err.status = 404;
     throw err;
  }

  if (conversation.isPublic) {
    const err= new Error("Conversation is not private");
    err.status = 400;
    throw err;
  }

  const membership = await Model.ConversationMember.findOne({
    where: {
      ConversationId: conversationId,
      UserId: userId
    }
  });

  if (!membership) {
    const err = new Error("User is not a member of this conversation");
    err.status = 404;
    throw err;
  }

  console.log(membership);
  if (!membership.isAdmin) {
    const err = new Error("User is not an admin of this conversation");
    err.status = 403;
    throw err;
  }

  conversation.password = require("../../utils/generateRandomString")(10);
  conversation.save();
}