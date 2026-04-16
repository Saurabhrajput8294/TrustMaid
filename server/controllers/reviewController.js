const { Review, Maid, User, Booking } = require('../config/database');

exports.createReview = async (req, res) => {
  const { maidId, bookingId, rating, title, comment } = req.body;
  try {
    // Check if booking exists and is completed
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'completed') return res.status(400).json({ message: 'Only completed bookings can be reviewed' });

    // Check if user already reviewed this booking
    const existingReview = await Review.findOne({ where: { bookingId } });
    if (existingReview) return res.status(400).json({ message: 'You have already reviewed this booking' });

    // Create review
    const review = await Review.create({
      maidId,
      userId: req.user.id,
      bookingId,
      rating,
      title,
      comment,
      verified_booking: true
    });

    // Update maid rating average
    const reviews = await Review.findAll({ where: { maidId } });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Maid.update({ rating: avgRating }, { where: { id: maidId } });
    }

    const reviewWithUser = await Review.findByPk(review.id, {
      include: { model: User, attributes: ['id', 'name'] }
    });

    res.status(201).json(reviewWithUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMaidReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { maidId: req.params.maidId },
      include: { model: User, attributes: ['id', 'name'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Maid, attributes: ['id'] },
        { model: User, attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: { model: User, attributes: ['id', 'name'] }
    });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ message: 'You can only edit your own reviews' });

    await Review.update({ rating, title, comment }, { where: { id: req.params.id } });

    // Update maid rating average
    const reviews = await Review.findAll({ where: { maidId: review.maidId } });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Maid.update({ rating: avgRating }, { where: { id: review.maidId } });
    }

    const updatedReview = await Review.findByPk(req.params.id);
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ message: 'You can only delete your own reviews' });

    const maidId = review.maidId;
    await Review.destroy({ where: { id: req.params.id } });

    // Update maid rating average
    const reviews = await Review.findAll({ where: { maidId } });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Maid.update({ rating: avgRating }, { where: { id: maidId } });
    } else {
      await Maid.update({ rating: 0 }, { where: { id: maidId } });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMaidAverageRating = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { maidId: req.params.maidId } });
    const counts = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    res.json({
      average: parseFloat(avgRating.toFixed(1)),
      total: reviews.length,
      distribution: counts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
