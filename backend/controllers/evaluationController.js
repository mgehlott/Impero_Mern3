const { matchedData, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
exports.addEvaluation = async (req, res, next) => {
  const { employeeId, company, percentage, salary, year } = matchedData(req);
  //const data = matchedData(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    next(err);
    return;
  }
  // if (!employeeId || !percentage || !salary || !year) {
  //   const err = new Error('All fields are required');
  //   next(err);
  //   return;
  // }
  console.log('done');
  try {
    const evaluationObj = {
      company,
      year,
      salary,
      percentage,
    };
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { evaluations: evaluationObj },
    });
    res.json('Evaluation added');
  } catch (error) {
    next(error);
  }
};
exports.getEvaluation = async (req, res, next) => {
  try {
    //const result = await Employee.find({}, { name: 1, evaluations: 1 });
    const data = await Employee.aggregate([
      {
        $unwind: '$evaluations',
      },
      { $project: { _id: 1, evaluations: 1, name: 1 } },
      { $sort: { 'evaluations.year': 1 } },
    ]);
    // console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
exports.deleteEvaluation = async (req, res, next) => {
  const { employeeId, companyId, year } = req.body;
  try {
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: { evaluations: { 'company.companyId': companyId, year: year } },
    });
    res.json({
      message: 'evaluation deleted',
    });
  } catch (error) {
    next(error);
  }
};
