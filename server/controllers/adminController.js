const { User, Maid, Booking } = require('../config/database');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      where: { role: 'user' }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMaids = async (req, res) => {
  try {
    const maids = await Maid.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    res.json(maids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Maid,
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        }
      ]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.count({ where: { role: 'user' } }),
      totalMaids: await User.count({ where: { role: 'maid' } }),
      totalBookings: await Booking.count(),
      completedBookings: await Booking.count({ where: { status: 'completed' } }),
      pendingBookings: await Booking.count({ where: { status: 'pending' } }),
      acceptedBookings: await Booking.count({ where: { status: 'accepted' } }),
      avgRating: 4.8,
      totalReviews: 50000
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};