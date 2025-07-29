// Get single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Customer.countDocuments();
    const customers = await Customer.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json({ customers, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    const exists = await Customer.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists' });
    const customer = new Customer({ name, email, phone, company, status, notes });
    await customer.save();
    res.status(201).json({ message: 'Customer created', customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, company, status, notes },
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer updated', customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
