const Model = require("../../models");

async function list(userId) {
  const user = await Model.User.findByPk(userId);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return await user.getConversations();
}

module.exports = list;