require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const router = require('./route/router');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [`${process.env.FRONTENDURL}`], 
  credentials: true
}));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('EaseCart Backend is running');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});


module.exports = app;

