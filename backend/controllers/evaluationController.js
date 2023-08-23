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
    console.log(year);
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
    let companyFilter = {};
    if (req.query.company) {
      companyFilter = {
        'evaluations.company.name': { $eq: req.query.company },
      };
    }
    const data = await Employee.aggregate([
      { $match: companyFilter },
      // {
      //   $unwind: '$evaluations',
      // },
      // {
      //   $group: {
      //     _id: '$_id',
      //     name:{$first:'$name'},
      //     evaluations: { $push: '$evaluations' },
      //   },
      // },
      { $project: { _id: 1, evaluations: 1, name: 1 } },
      { $unwind: '$evaluations' },
      // { $sort: { 'evaluations.year': 1 } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          evaluations: {
            $push: '$evaluations',
          },
          totalEvaluation: { $sum: '$evaluations.salary' },
        },
      },
      // { $sort: { 'evaluations.year': 1 } },
    ]);
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
exports.deleteEvaluation = async (req, res, next) => {
  const { employeeId, companyId, year } = req.body;
  console.log(employeeId, companyId, year);
  try {
    const result = await Employee.findByIdAndUpdate(employeeId, {
      $pull: {
        evaluations: {
          'company.companyId': companyId,
          year: year,
        },
      },
    });
    console.log(result);
    res.json({
      message: 'evaluation deleted',
    });
  } catch (error) {
    next(error);
  }
};
exports.getYearsRange = async (req, res, next) => {
  try {
    // const data = await Employee.find(
    //   {},
    //   { 'evaluations.year': 1, _id: 0 }
    // ).sort({ 'evaluations.year': 1 });
    const data = await Employee.aggregate([
      { $project: { _id: 1, 'evaluations.year': 1, name: 1 } },
      { $unwind: '$evaluations' },
      {
        $group: {
          _id: null,
          minYear: { $min: '$evaluations.year' },
          maxYear: { $max: '$evaluations.year' },
        },
      },
    ]);
    const years = [];
    //    console.log(data);
    for (let i = data[0].minYear; i <= data[0].maxYear; i++) {
      years.push(i);
    }
    return res.json(years);
  } catch (error) {
    next(error);
  }
};
exports.editEvaluation = async (req, res, next) => {
  const { employeeId } = req.params;
  const { company, updateYear, year, salary, percentage } = matchedData(req);
  console.log(employeeId, company, year, salary, percentage, updateYear);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    next(err);
    return;
  }
  try {
    const result = await Employee.updateOne(
      {
        _id: employeeId,
        evaluations: {
          $elemMatch: { 'company.name': company, year: year },
        },
      },
      {
        $set: {
          'evaluations.$.year': updateYear,
          'evaluations.$.salary': salary,
          'evaluations.$.percentage': percentage,
        },
      },
      { new: true }
    );
    res.json({ message: 'Updated', result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
