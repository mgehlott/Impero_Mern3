const Company = require('../models/Company');
const Employee = require('../models/Employee');
exports.addCompany = async (req, res, next) => {
  console.log('company');
  const { name } = req.body;
  console.log(name);
  if (!name) {
    const err = new Error('name is required');
    console.log(err);
    next(err);
    return;
  }
  try {
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
  if (!req.body.name) {
    const err = new Error('name is require');
    next(err);
    return;
  }
  try {
    await Employee.updateMany(
      {
        $or: [
          { 'company.companyId': companyId },
          { evaluations: { $elemMatch: { companyId: companyId } } },
        ],
      },
      {
        $set: {
          'company.name': req.body.name,
          'evaluations.$.company.name': req.body.name,
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
