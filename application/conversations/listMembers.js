const Model = require("../../models");

module.exports = async function ({userId, conversationId}) {
  const membership = await Model.ConversationMember.findOne({
    where: {
      UserId: userId,
      ConversationId: conversationId
    }
  });

  if (!membership) {
    const err = new Error("You are not a member of this conversation");
    err.status = 403;
    throw err;
  }

  let members = await Model.ConversationMember.findAll({
    where: {
      ConversationId: conversationId
    },
    include: [{
      model: Model.User,
      attributes: ["displayName"]
    }]
  });

  return members;
}