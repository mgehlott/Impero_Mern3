const { matchedData, validationResult } = require('express-validator');
const Company = require('../models/Company');
const Employee = require('../models/Employee');
exports.addCompany = async (req, res, next) => {
  console.log('company');
  const { name } = matchedData(req);
  console.log(name);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    console.log(err);
    next(err);
    return;
  }
  try {
    const fetchCompany = await Company.findOne({ name });
    if (
      fetchCompany ||
      fetchCompany.name.toLowerCase() === name.toLowerCase()
    ) {
      const err = new Error('Company name is already exits');
      console.log(err);
      next(err);
      return;
    }
    const company = await Company.create({ name });
    console.log(company);
    res.json(company);
  } catch (error) {
    next(error);
  }
};
exports.getAllCompany = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    next(error);
  }
};
exports.editCompany = async (req, res, next) => {
  const { companyId } = req.params;
  const { name } = matchedData(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    next(err);
    return;
  }
  try {
    const fetchCompany = await Company.findOne({ name });
    if (
      fetchCompany ||
      fetchCompany?.name.toLowerCase() === name.toLowerCase()
    ) {
      const err = new Error('Company name is already exits');
      console.log(err);
      next(err);
      return;
    }
    await Employee.updateMany(
      {
        $or: [
          { 'company.companyId': companyId },
          { evaluations: { $elemMatch: { companyId: companyId } } },
        ],
      },
      {
        $set: {
          'company.name': name,
          'evaluations.$.company.name': name,
        },
      }
    );
    const updated = await Company.findByIdAndUpdate(companyId, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
exports.deleteCompany = async (req, res, next) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.companyId);
    res.json('Company deleted');
  } catch (error) {
    next(error);
  }
};
