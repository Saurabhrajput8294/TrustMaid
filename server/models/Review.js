const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    maidId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    title: { type: DataTypes.STRING(100) },
    comment: { type: DataTypes.TEXT },
    helpful_votes: { type: DataTypes.INTEGER, defaultValue: 0 },
    verified_booking: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { timestamps: true });

  return Review;
};
