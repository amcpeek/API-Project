'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
       // constraints: false
      })
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId'
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      }
    } ,
    stars:  {
      type: DataTypes.INTEGER,
      validate: {
      min: 1,
       max: 5
      }
  }
}, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
