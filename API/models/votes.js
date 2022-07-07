'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Votes.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CoinID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Coins',
          key: "CoinID"
        }
    },
    DateOfVote: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    IPAddress: {
        type: DataTypes.STRING,
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
    modelName: 'Votes',
  });
  return Votes;
};