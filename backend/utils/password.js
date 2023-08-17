const bcrypt = require('bcrypt');
exports.hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};
exports.checkPassword = async (plainPass, hashedPass) => {
  const result = await bcrypt.compare(plainPass, hashedPass);
  return result;
};
