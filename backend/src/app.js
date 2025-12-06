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

app.get('/getAllProducts', getAllProducts);

app.get('/', (req, res) => {
  res.send('EaseCart Backend is running');
});

app.use((err, req, res, next) => {
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

// connect once at startup and leave connection open for incoming requests
main().catch((err) => console.error('Error during main execution:', err));

// Only start listening when this file is run directly. This keeps the module
// import-safe for serverless wrappers that `require` the app.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;