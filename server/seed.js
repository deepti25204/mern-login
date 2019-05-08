require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

const db = require('./models');

const users = [
  { username: 'deepti', email:'abc@gmail.com', password: 'password' },
  { username: 'diya', email:'def@gmail.com', password: 'password' },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('DROP ALL USERS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

  } catch (err) {
    console.error(err);
  }
};

seed();