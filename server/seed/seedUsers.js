const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const users = [
  {
    name: 'John Doe',
    email: 'john.doe@crm.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Sales Manager',
    phone: '+1-800-CRM-USER',
    address: '456 CRM Lane, Business City, Country',
    password: 'password123',
    joined: new Date('2023-01-10'),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@crm.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Marketing Lead',
    phone: '+1-800-CRM-MKT',
    address: '789 CRM Road, Business City, Country',
    password: 'password456',
    joined: new Date('2024-03-15'),
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Seeded users');
  mongoose.disconnect();
}

seed();
