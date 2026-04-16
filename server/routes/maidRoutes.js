const express = require('express');
const { getMaids, getMaidById, registerMaid, updateAvailability } = require('../controllers/maidController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', getMaids);
router.get('/:id', getMaidById);
router.post('/register', auth, registerMaid);
router.put('/availability', auth, updateAvailability);
router.put('/availability/:userId', auth, updateAvailability);

module.exports = router;