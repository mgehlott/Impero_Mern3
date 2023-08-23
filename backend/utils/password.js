const bcrypt = require('bcrypt');
const crypto = require('crypto');
exports.hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};
exports.checkPassword = async (plainPass, hashedPass) => {
  const result = await bcrypt.compare(plainPass, hashedPass);
  return result;
};
exports.getRandomPassword = () => {
  const randomPassword = crypto.randomBytes(4).toString('hex');
  return randomPassword;
};
