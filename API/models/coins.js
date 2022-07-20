'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coins.init({
    CoinID: {       
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Chain: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ContractAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LaunchDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    IsPresale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    IsDoxxed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    Description: {
        type: DataTypes.STRING(1200),
        allowNull: true
    },
    AuditLink: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    PresaleLink: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Website: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    Telegram: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Twitter: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Discord: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    LogoLink: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    ContactEmail: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING(64),
        allowNull: false
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
    modelName: 'Coins',
  });
  return Coins;
};