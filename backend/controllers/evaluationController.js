const Employee = require('../models/Employee');
exports.addEvaluation = async (req, res, next) => {
  const { employeeId, company, percentage, salary, year } = req.body;
  if (!employeeId || !percentage || !salary || !year) {
    const err = new Error('All fields are required');
    next(err);
    return;
  }
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
    const result = await Employee.find({}, { name: 1, evaluations: 1 });
    res.json(result);
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
