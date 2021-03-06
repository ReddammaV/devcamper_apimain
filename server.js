const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const colors = require('colors');
// required files
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({path: './config/config.env'})

// connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express()

// Body parser
app.use(express.json())

// cookie parser
app.use(cookieParser())

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// File Uploading
app.use(fileupload())

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

// error should be after routers
app.use(errorHandler);

// process.env (is dotenv syntax based code) through config.env
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1))
})