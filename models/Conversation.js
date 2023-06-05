'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(sequelize['User'], {through: sequelize['ConversationMember']});
      this.hasMany(sequelize['Message']);
      this.belongsTo(sequelize['ConversationType']);
    }
  }
  Conversation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    displayName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};
