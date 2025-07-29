const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const dotenv = require('dotenv');
dotenv.config();

const customers = [
  {
    name: 'Alice Johnson',
    email: 'alice@acme.com',
    phone: '+1-555-1234',
    company: 'Acme Corp',
    status: 'Active',
    notes: 'Top client, interested in new campaign.'
  },
  {
    name: 'Bob Lee',
    email: 'bob@beta.com',
    phone: '+1-555-5678',
    company: 'Beta LLC',
    status: 'Active',
    notes: 'Requested demo for new product.'
  },
  {
    name: 'Carol Smith',
    email: 'carol@gamma.com',
    phone: '+1-555-9012',
    company: 'Gamma Inc',
    status: 'Inactive',
    notes: 'Follow up in Q3.'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Customer.deleteMany({});
  await Customer.insertMany(customers);
  console.log('Seeded customers');
  mongoose.disconnect();
}

seed();
