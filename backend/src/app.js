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
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT
app.listen(4000, () => {
  console.log(`Server running on 4000`)
});


module.exports = app;

