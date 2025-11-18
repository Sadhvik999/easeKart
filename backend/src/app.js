const express = require('express');
const cookieParser = require('cookie-parser'); // add this
const cors = require('cors'); // optional but recommended
const router = require('./route/router'); // ensure this path is correct
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use('/api', router);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// If this file starts the server, ensure listen happens here:
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;


