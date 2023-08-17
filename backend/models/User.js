const mongoose = require('mongoose');
const { hashPassword } = require('../utils/password');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const user = mongoose.model('user', userSchema);
// hashPassword('12345').then((pass) =>
//   user
//     .create({
//       name: 'admin',
//       email: 'admin@gmail.com',
//       password: pass,
//     })
//     .then((data) =>  console.log(data))
// );
module.exports = user;
