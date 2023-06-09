const Model = require("../../models");

async function create({userId, users, isPublic, displayName}) {
  users = users.filter(user => user.id !== userId);
  const conversation = await Model.Conversation.create({displayName, isPublic: !!isPublic});
  await conversation.setUsers(await Promise.all(users.map(async user => await Model.User.findByPk(user.id))));
  console.log(conversation.id);
  const member = await Model.ConversationMember.create({
    UserId: userId,
    ConversationId: conversation.id,
  })

  if (users.length > 1) {
    if (!isPublic){
      member.isAdmin = true;
      await member.save();
      await require("./renewPassword")({userId, conversationId: conversation.id});
    }
  }

  return conversation;
}

module.exports = create;
