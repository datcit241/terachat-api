const Model = require("../../models");

async function list(userId) {
  const user =  Model["User"].findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return await user.getConversations();
}

module.exports = list;