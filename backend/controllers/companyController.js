const { matchedData, validationResult } = require('express-validator');
const Company = require('../models/Company');
const Employee = require('../models/Employee');
const { deleteImage } = require('../utils/service');
exports.addCompany = async (req, res, next) => {
  console.log('company');
  const { name, address, description } = matchedData(req);
  console.log(name, address, description, req.file);
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
    const imageName = req?.file?.filename || '';
    const company = await Company.create({
      name,
      address,
      description,
      image: imageName,
    });
    console.log('add company', company);
    res.json(company);
  } catch (error) {
    next(error);
  }
};
exports.getCompany = async (req, res, next) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if (company) {
      return res.json(company);
    } else {
      const err = new Error('No Company found');
      return next(err);
    }
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
  const { name, address, description } = matchedData(req);
  console.log(name, address, req.file);
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
      fetchCompany &&
      fetchCompany?.name.toLowerCase() === name.toLowerCase() &&
      fetchCompany._id.toString() !== companyId
    ) {
      const err = new Error('Company name is already exits');
      console.log(err);
      next(err);
      return;
    }
    // console.log(
    //   await Employee.find({
    //     $or: [
    //       { 'company.companyId': companyId },
    //       { evaluations: { $elemMatch: { 'company.companyId': companyId } } },
    //     ],
    //   })
    // );
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
    const data = {
      name: name,
      address: address,
      description: description,
    };
    if (req.file && req.file.filename) {
      data.image = req.file.filename;
    }
    const previousCompany = await Company.findByIdAndUpdate(companyId, {
      $set: data,
    });
    if (
      req.file &&
      previousCompany.image &&
      previousCompany.image.length !== 0
    ) {
      deleteImage(previousCompany.image);
    }
    res.json('updated');
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
    const company = await Company.findById(companyId);
    if (company.image && company.image.length !== 0) {
      deleteImage(company.image);
    }
    const deleted = await Company.findByIdAndDelete(companyId);
    console.log('deleted', deleted);
    res.json('Company deleted');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
