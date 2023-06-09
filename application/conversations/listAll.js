const Model = require("../../models");

module.exports = async function () {
    const memberships = await Model.ConversationMember.findAll({
        attributes: [
            "ConversationId",
            [Model.Sequelize.fn("COUNT", Model.Sequelize.col("UserId")), "members"],
        ],
        group: ["ConversationId"],
        raw: true,
    });

    const conversations = memberships.filter(conversation => conversation.members > 2);

    return Promise.all(conversations.map(async membership => await Model.Conversation
        .findOne({
            where: {
                id: membership.ConversationId
            },
            attributes: {exclude: ["password"]}
        })
    ));
}