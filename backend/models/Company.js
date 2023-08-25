const mongoose = require('mongoose');
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
