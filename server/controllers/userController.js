const { User, Maid, Booking } = require('../config/database');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, address } = req.body;
  try {
    await User.update({ name, email, address }, { where: { id: req.user.id } });
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalMaids = await User.count({ where: { role: 'maid' } });
    const totalBookings = await Booking.count();
    const completedBookings = await Booking.count({ where: { status: 'completed' } });
    
    res.json({
      totalUsers,
      totalMaids,
      totalBookings,
      completedBookings,
      avgRating: 4.8
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};