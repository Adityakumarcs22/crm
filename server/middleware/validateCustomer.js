function validateCustomer(req, res, next) {
  const { name, email, status } = req.body;
  if (!name || typeof name !== 'string' || name.length < 2) {
    return res.status(400).json({ error: 'Name is required and must be at least 2 characters.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (status && !['Active', 'Prospect'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Active or Prospect.' });
  }
  next();
}

module.exports = validateCustomer;
