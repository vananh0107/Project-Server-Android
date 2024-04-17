const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoute');
const discountRoute = require('./routes/discountRoute');
const uploadRoute = require('./routes/uploadRoute');
const { notFound, errorHandler } = require('./middleware/errHandler');
const morgan = require('morgan');
const app = express();
dbConnect();
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/discount', discountRoute);
app.use('/api/upload', uploadRoute);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`);
  });