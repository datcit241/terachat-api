const Model = require("../../models");

async function create({userId, users, isPublic}) {
  const conversation = await Model.Conversation.create();
  await conversation.setUsers(await Promise.all(users.map(async user => await Model.User.findByPk(user.id))));
  console.log(conversation.id);
  const member = await Model.ConversationMember.create({
    UserId: userId,
    ConversationId: conversation.id,
  })

  if (users.length > 1) {
    if (isPublic){
      conversation.isPublic = true;
      await conversation.save();
    } else {
      member.isAdmin = true;
      await member.save();
      await require("./renewPassword")({userId, conversationId: conversation.id});
    }
  }

  return conversation;
}

module.exports = create;