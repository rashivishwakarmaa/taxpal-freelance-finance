require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('../src/models/user.model');

const DEMO_EMAIL = 'demo@taxpal.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = 'Demo User';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await UserModel.findOne({ email: DEMO_EMAIL });
    if (existing) {
      existing.password = DEMO_PASSWORD;
      await existing.save();
      console.log('Demo user password updated.');
    } else {
      await UserModel.create({ email: DEMO_EMAIL, password: DEMO_PASSWORD, name: DEMO_NAME });
      console.log('Demo user created.');
    }
    console.log('\n--- Demo credentials ---');
    console.log('Email:    demo@taxpal.com');
    console.log('Password: demo123');
    console.log('------------------------\n');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
