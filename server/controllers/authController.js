const { User, Maid } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role, address } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role, address });
    
    // Automatically create Maid profile if registering as maid
    if (role === 'maid') {
      await Maid.create({
        userId: user.id,
        skills: [],
        experience: 0,
        availability: true
      });
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, name, email, role, address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email, role: user.role, address: user.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};