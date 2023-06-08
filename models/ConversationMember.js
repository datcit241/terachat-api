'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Conversation);
    }
  }
  ConversationMember.init({
    ConversationId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize['Conversation'],
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize['User'],
        key: 'id'
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ConversationMember',
  });
  return ConversationMember;
};
