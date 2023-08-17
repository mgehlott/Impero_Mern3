const Company = require('../models/Company');
const Employee = require('../models/Employee');
const { Types } = require('mongoose');
exports.addEmployee = async (req, res, next) => {
  const {
    company: companyId,
    name,
    email,
    birthdate,
    joiningdate,
    resignationdate,
    salary,
  } = req.body;
  console.log(req.body);
  console.log(companyId);
  if (!companyId || !name || !email || !birthdate || !joiningdate || !salary) {
    const err = new Error('All Fields are require');
    next(err);
    return;
  }
  try {
    const user = await Employee.findOne({ email });
    if (user) {
      const err = new Error('Email already exits');
      next(err);
      return;
    } else if (getAge(birthdate) <= 18) {
      const err = new Error('Age is less than 18');
      next(err);
      return;
    } else if (compareDate(birthdate, joiningdate)) {
      const err = new Error('Birth date must be lower than joining date');
      next(err);
    } else {
      const companyName = await Company.findById(companyId);
      const tempUser = {
        company: {
          name: companyName.name,
          companyId: companyId,
        },
        name,
        email,
        birthDate: new Date(birthdate),
        joiningDate: new Date(joiningdate),
        salary,
      };
      if (resignationdate) {
        tempUser.resignationDate = new Date(resignationdate);
      }
      console.log(tempUser);
      const newUser = await Employee.create(tempUser);
      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
};
exports.getEmployee = async (req, res, next) => {
  console.log(req.query);
  const sort = {};
  if (req.query.sortBy && req.query.order) {
    sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
  }
  console.log(sort);
  try {
    const employees = await Employee.find({}, null, { sort: sort });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
exports.editEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  console.log(req.body);
  const updated = await Employee.findByIdAndUpdate(employeeId, req.body, {
    new: true,
  });
  // console.log(updated);
  res.json(updated);
};
exports.deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.employeeId);
    res.json('Employee Deleted');
  } catch (error) {
    next(error);
  }
};
const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
const compareDate = (dateString1, dateString2) => {
  const time1 = new Date(dateString1).getTime();
  const time2 = new Date(dateString2).getTime();
  return time1 > time2;
};
