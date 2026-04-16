const { Booking, Maid, User } = require('../config/database');

exports.createBooking = async (req, res) => {
  const { maidId, service, date, time } = req.body;
  try {
    const maid = await Maid.findByPk(maidId);
    if (!maid) return res.status(404).json({ message: 'Maid not found' });
    
    const booking = await Booking.create({
      userId: req.user.id,
      maidId,
      service,
      date,
      time,
      status: 'pending'
    });
    
    const bookingWithDetails = await Booking.findByPk(booking.id, {
      include: [{ model: Maid, include: User }]
    });
    
    res.status(201).json(bookingWithDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [{ model: Maid, include: User }]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMaidBookings = async (req, res) => {
  try {
    const maid = await Maid.findOne({ where: { userId: req.user.id } });
    if (!maid) return res.status(404).json({ message: 'Maid not found' });
    const bookings = await Booking.findAll({
      where: { maidId: maid.id },
      include: User
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    await Booking.update({ status }, { where: { id: req.params.id } });
    const booking = await Booking.findByPk(req.params.id);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Only allow cancellation of pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
    }
    
    // Only allow the user who made the booking to cancel it
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }
    
    // Check if booking is within 24 hours of creation (optional business rule)
    const bookingTime = new Date(booking.createdAt);
    const now = new Date();
    const hoursDiff = (now - bookingTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      return res.status(400).json({ message: 'Bookings can only be cancelled within 24 hours of creation' });
    }
    
    await Booking.update({ status: 'cancelled' }, { where: { id: req.params.id } });
    const updatedBooking = await Booking.findByPk(req.params.id);
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.messageClient = async (req, res) => {
  const { message } = req.body;

  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [User]
    });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const maid = await Maid.findOne({ where: { userId: req.user.id } });
    if (!maid || booking.maidId !== maid.id) {
      return res.status(403).json({ message: 'You are not authorized to message this client' });
    }

    const maidUser = await User.findByPk(req.user.id);
    if (!maidUser || maidUser.role !== 'maid') {
      return res.status(403).json({ message: 'Only maid accounts can send messages to clients' });
    }

    const recipientEmail = booking.User?.email;
    if (!recipientEmail) {
      return res.status(400).json({ message: 'Client email not available' });
    }

    const nodemailer = require('nodemailer');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ message: 'Email transport is not configured. Set EMAIL_USER and EMAIL_PASS in .env.' });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: maidUser.email,
      subject: `Message from ${maidUser.name} via TrustMaid`,
      text: `${message || 'Your maid has sent a message about your booking.'}\n\n--\n${maidUser.name} at TrustMaid`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};