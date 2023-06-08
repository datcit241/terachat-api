const Model = require("../../models");

module.exports = async function () {
  const users = await Model.User.findAll({
    attributes: ["id", "displayName"]
  });

  return users;
}