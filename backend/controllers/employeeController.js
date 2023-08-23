const { matchedData, validationResult } = require('express-validator');
const Company = require('../models/Company');
const Employee = require('../models/Employee');
const { getRandomPassword, hashPassword } = require('../utils/password');
const { sendMail } = require('../utils/mail');
exports.addEmployee = async (req, res, next) => {
  const {
    company: companyId,
    name,
    email,
    birthdate,
    joiningdate,
    resignationdate,
    salary,
  } = matchedData(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const err = new Error(errors.array()[0].msg);
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
      return next(err);
    } else {
      console.log('dljflsdjf', companyId);
      const companyName = await Company.findById(companyId);
      console.log(companyName);
      if (!companyName) {
        const err = new Error('Company does not exits');
        return next(err);
      }
      const tempPassword = getRandomPassword();
      const hashedPassword = await hashPassword(tempPassword);
      console.log(process.env.GMAIL_PASSWORD, process.env.GMAIL_USER);
      sendMail({
        to: email,
        subject: '!!Account Created !!',
        text: 'Congratulation, Your account have created',
        html: `<h3>Hy, ${name}, Please Login with following credential </h3> <p>email: mahendragehlot006@gmail.com</p><p>Password: ${tempPassword}</p>`,
      });
      const tempUser = {
        company: {
          name: companyName.name,
          companyId: companyId,
        },
        name,
        email,
        password: hashedPassword,
        birthDate: new Date(birthdate),
        joiningDate: new Date(joiningdate),
        salary,
      };
      console.log(tempUser);
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
  const filter = {};
  if (req.query.salary) {
    filter['salary'] = { $lte: req.query.salary };
  }
  if (req.query.joiningDate) {
    console.log(req.query.joiningDate);
    filter['joiningDate'] = { $lte: new Date(req.query.joiningDate) };
  }
  console.log(filter);
  try {
    const employees = await Employee.find(filter);
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
exports.editEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  console.log(req.body);
  const user = await Employee.findOne({ email: req.body.email });
  console.log(user);
  // console.log(user._id.toString(), employeeId);
  if (user && user._id.toString() !== employeeId) {
    const err = new Error('Email already exits');
    next(err);
    return;
  } else if (getAge(req.body.birthdate) <= 18) {
    const err = new Error('Age is less than 18');
    next(err);
    return;
  } else if (compareDate(req.body.birthdate, req.body.joiningdate)) {
    const err = new Error('Birth date must be lower than joining date');
    return next(err);
  }
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
