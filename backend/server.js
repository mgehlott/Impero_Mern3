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
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 5000;
dbConnect();

app.use('/company',authMiddleware, companyRouter);
app.use('/employee',authMiddleware, employeeRouter);
app.use('/evaluation',authMiddleware, evaluationRouter);
app.use('/auth', authRouter);
app.use(notFound);
app.use(mainErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
