const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    maidId: { type: DataTypes.INTEGER, allowNull: false },
    service: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled'), defaultValue: 'pending' }
  }, { timestamps: true });

  return Booking;
};