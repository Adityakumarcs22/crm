const User = require('../models/User');

// Get profile by email
exports.getProfile = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      phone: user.phone,
      address: user.address,
      joined: user.joined,
    });
  } catch (err) {
    next(err);
  }
};

// Update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const update = req.body;
    const user = await User.findOneAndUpdate({ email }, update, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    next(err);
  }
};
