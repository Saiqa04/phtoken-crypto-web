'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    Number: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    TxnHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Memo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};