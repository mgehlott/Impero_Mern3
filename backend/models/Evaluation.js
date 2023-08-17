const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    percentage: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    salary: {
      type: Number,
      require: true,
    },
    company: {
      type: String,
      require:true
    }
  },
  { timestamps: true }
);

const evaluation = mongoose.model("evaluation", evaluationSchema);
module.exports = evaluation;
