'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BannerAds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BannerAds.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    BannerType: {
        //Fixed Banner, Rotating Banner, Popup Banner
        type: DataTypes.STRING,
        allowNull: false
    },
    ImageLocation: {
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
    ReservationNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telegram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Swap: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Website: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BannerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
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
    modelName: 'BannerAds',
  });
  return BannerAds;
};