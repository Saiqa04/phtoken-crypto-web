'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservations.init({
    Number: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    AdType: {
        ///Fixed Banner, Rotating Banner, Popup Banner, Promoted Coin
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Telegram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AmountToPay: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    PaymentStatus: {
        ///Values: ['Paid','Pending']
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
    modelName: 'Reservations',
  });
  return Reservations;
};