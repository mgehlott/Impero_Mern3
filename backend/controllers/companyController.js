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
    console.log(fetchCompany);
    if (
      fetchCompany &&
      fetchCompany.name.toLowerCase() === name.toLowerCase()
    ) {
      const err = new Error('Company name is already exits');
      console.log(err);
      next(err);
      return;
    }
    console.log('insert', fetchCompany);
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
  console.log(companyId, name);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array()[0].msg);
    next(err);
    return;
  }
  try {
    const fetchCompany = await Company.findOne({ name });
    if (
      fetchCompany &&
      fetchCompany?.name.toLowerCase() === name.toLowerCase()
    ) {
      const err = new Error('Company name is already exits');
      console.log(err);
      next(err);
      return;
    }
    console.log(
      await Employee.find({
        $or: [
          { 'company.companyId': companyId },
          { evaluations: { $elemMatch: { 'company.companyId': companyId } } },
        ],
      })
    );
    await Employee.updateMany(
      {
        $or: [
          { 'company.companyId': companyId },
          { evaluations: { $elemMatch: { 'company.companyId': companyId } } },
        ],
      },
      {
        $set: {
          'company.name': name,
          'evaluations.$[].company.name': name,
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
    const companyId = req.params.companyId;
    console.log(companyId);
    const employee = await Employee.findOne({ 'company.companyId': companyId });
    if (employee) {
      return res.status(500).json('Currently you can not delete.');
    }
    const deleted = await Company.findByIdAndDelete(companyId);
    res.json('Company deleted');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
