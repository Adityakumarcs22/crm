const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Basic route
app.get('/', (req, res) => {
  res.send('CRM System API is running');
});

// CRM API routes

const crmRoutes = require('./routes/crm');
app.use('/api', crmRoutes);

const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const campaignsRoutes = require('./routes/campaigns');
app.use('/api/campaigns', campaignsRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// Catch-all handler for unmatched API routes (safe version)
// Safe catch-all handler for unmatched API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  next();
});

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
