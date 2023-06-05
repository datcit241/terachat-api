'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(sequelize['Conversation']);
    }
  }
  ConversationType.init({
    name: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'ConversationType',
  });
  return ConversationType;
};
