const mongoose = require('mongoose');
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('connected to database');
  } catch (error) {
    console.log('error in db connection', error);
  }
};
module.exports = dbConnect;
