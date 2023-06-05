const Model = require("../../models");

async function create({users, type}) {
  const conversation = await Model['Conversation'].create();
  await conversation.setUsers(users);

  return conversation;
}

module.exports = create;