const express = require('express');
const {
  createReview,
  getMaidReviews,
  getUserReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getMaidAverageRating
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createReview);
router.get('/maid/:maidId', getMaidReviews);
router.get('/maid/:maidId/rating', getMaidAverageRating);
router.get('/user', auth, getUserReviews);
router.get('/:id', getReviewById);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
