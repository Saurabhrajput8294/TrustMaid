const { Sequelize } = require('sequelize');
const User = require('../models/User');
const Maid = require('../models/Maid');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Initialize models once
const userModel = User(sequelize);
const maidModel = Maid(sequelize);
const bookingModel = Booking(sequelize);
const reviewModel = Review(sequelize);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');

    // Associations
    userModel.hasOne(maidModel, { foreignKey: 'userId' });
    maidModel.belongsTo(userModel, { foreignKey: 'userId' });
    userModel.hasMany(bookingModel, { foreignKey: 'userId' });
    bookingModel.belongsTo(userModel, { foreignKey: 'userId' });
    maidModel.hasMany(bookingModel, { foreignKey: 'maidId' });
    bookingModel.belongsTo(maidModel, { foreignKey: 'maidId' });
    
    // Review associations
    userModel.hasMany(reviewModel, { foreignKey: 'userId' });
    reviewModel.belongsTo(userModel, { foreignKey: 'userId' });
    maidModel.hasMany(reviewModel, { foreignKey: 'maidId' });
    reviewModel.belongsTo(maidModel, { foreignKey: 'maidId' });
    bookingModel.hasMany(reviewModel, { foreignKey: 'bookingId' });
    reviewModel.belongsTo(bookingModel, { foreignKey: 'bookingId' });

    await sequelize.sync({ alter: true });

    // Ensure the booking status enum includes cancelled
    await sequelize.query(
      "ALTER TABLE `Bookings` MODIFY COLUMN `status` ENUM('pending','accepted','rejected','completed','cancelled') NOT NULL DEFAULT 'pending';"
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB, User: userModel, Maid: maidModel, Booking: bookingModel, Review: reviewModel };