const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'maid', 'admin'), defaultValue: 'user' },
    address: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });

  return User;
};