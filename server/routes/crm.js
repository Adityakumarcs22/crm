const express = require('express');
const router = express.Router();

// Sample data for demonstration
const customers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Prospect' }
];

const salesPipeline = [
  { id: 1, stage: 'Lead', value: 5000 },
  { id: 2, stage: 'Negotiation', value: 12000 }
];

const campaigns = [
  { id: 1, name: 'Summer Sale', status: 'Running' },
  { id: 2, name: 'Email Blast', status: 'Completed' }
];

const analytics = {
  retentionRate: 85,
  conversionRate: 22,
  totalSales: 17000
};

// Routes
router.get('/customers', (req, res) => res.json(customers));
router.get('/sales-pipeline', (req, res) => res.json(salesPipeline));
router.get('/campaigns', (req, res) => res.json(campaigns));
router.get('/analytics', (req, res) => res.json(analytics));

module.exports = router;
