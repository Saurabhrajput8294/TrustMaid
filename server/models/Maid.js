const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Maid = sequelize.define('Maid', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    skills: { type: DataTypes.JSON },
    experience: { type: DataTypes.INTEGER, defaultValue: 0 },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    address: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });

  return Maid;
};