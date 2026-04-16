const { Maid, User } = require('../config/database');

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

exports.getMaidById = async (req, res) => {
  try {
    const maid = await Maid.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    if (!maid) return res.status(404).json({ message: 'Maid not found' });
    res.json(maid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerMaid = async (req, res) => {
  const { skills, experience, address } = req.body;
  try {
    const existingMaid = await Maid.findOne({ where: { userId: req.user.id } });
    if (existingMaid) return res.status(400).json({ message: 'Already registered as maid' });
    
    const maid = await Maid.create({
      userId: req.user.id,
      skills: skills || [],
      experience: experience || 0,
      address: address || null
    });
    
    // Fetch with User data included
    const maidWithUser = await Maid.findByPk(maid.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email', 'address']
      }
    });
    res.status(201).json(maidWithUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAvailability = async (req, res) => {
  const { availability, skills, experience, address } = req.body;
  const userId = req.params.userId || req.user.id;
  try {
    let maid = await Maid.findOne({ where: { userId: userId } });
    
    if (!maid) {
      // Create maid record if it doesn't exist
      maid = await Maid.create({
        userId: userId,
        skills: skills || [],
        experience: experience || 0,
        availability: availability !== undefined ? availability : true,
        address: address || null
      });
    } else {
      // Update existing maid record
      if (availability !== undefined) maid.availability = availability;
      if (skills !== undefined) maid.skills = skills;
      if (experience !== undefined) maid.experience = experience;
      if (address !== undefined) maid.address = address;
      await maid.save();
    }
    
    res.json(maid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};