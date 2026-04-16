const express = require('express');
const { createBooking, getUserBookings, getMaidBookings, updateBookingStatus, cancelBooking, messageClient } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createBooking);
router.get('/user', auth, getUserBookings);
router.get('/maid', auth, getMaidBookings);
router.put('/:id/status', auth, updateBookingStatus);
router.put('/:id/cancel', auth, cancelBooking);
router.post('/:id/message', auth, messageClient);

module.exports = router;