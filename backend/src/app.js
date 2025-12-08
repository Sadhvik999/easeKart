const dotenv = require('dotenv');
const { prisma } = require('./db/dbConfig');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { router } = require('./route/router');
const { getAllProducts } = require('./products/product');
const app = express();
dotenv.config();
app.use(cors({
  origin: [`${process.env.FRONTEND_URL}`, `${process.env.FRONTEND_N_URL}`],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api', router);

app.get('/', (req, res) => {
  res.send('EaseCart Backend is running');
});

app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

main().catch((err) => console.error('Error during main execution:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;