const express = require('express');
const { getUsers, getMaids, getBookings, getDashboardStats } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/stats', auth, getDashboardStats);
router.get('/users', auth, getUsers);
router.get('/maids', auth, getMaids);
router.get('/bookings', auth, getBookings);

module.exports = router;