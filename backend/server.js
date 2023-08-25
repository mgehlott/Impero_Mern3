const express = require('express');
const dotenv = require('dotenv');
const companyRouter = require('./routes/company');
const employeeRouter = require('./routes/employee');
const evaluationRouter = require('./routes/evaluation');
const authRouter = require('./routes/auth');
const dbConnect = require('./utils/dbConnect');
const { notFound, mainErrorHandler } = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const cors = require('cors');
const { getRandomPassword } = require('./utils/password');
const app = express();
global.__baseurl = __dirname;
dotenv.config();
// app.use((req, res, next) => {
//   console.log('app');
//   req.app = app;
//   next();
// })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/public/images', express.static(__dirname + '/public/images/'));
const PORT = process.env.PORT || 5000;
dbConnect();
app.use('/company', authMiddleware, companyRouter);
app.use('/employee', authMiddleware, employeeRouter);
app.use('/evaluation', authMiddleware, evaluationRouter);
app.use('/auth', authRouter);
app.use(notFound);
app.use(mainErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
