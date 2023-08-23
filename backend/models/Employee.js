const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema(
  {
    company: {
      name: {
        type: String,
        default: '',
      },
      companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        _id: false,
      },
    },
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
    birthDate: {
      type: Date,
      require: true,
    },
    joiningDate: {
      type: Date,
      require: true,
    },
    resignationDate: {
      type: Date,
    },
    salary: {
      type: Number,
    },
    evaluations: [
      {
        company: {
          name: {
            type: String,
            default: '',
          },
          companyId: {
            type: mongoose.Types.ObjectId,
            ref: 'Company',
            _id: false,
          },
        },
        year: Number,
        salary: Number,
        percentage: Number,
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
