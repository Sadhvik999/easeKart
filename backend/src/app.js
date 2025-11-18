require('dotenv').config()
const { prisma } = require('./db/dbConfig');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const  { router } = require('./route/router');
const app = express();
app.use(cors({
  origin :`${process.env.FRONTEND_URL}`, 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api', router);

app.get('/', (req, res) => {
  res.send('EaseCart Backend is running');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

async function main(){
  try{
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  }catch(err){
    console.error(err);
  }
}

main()
.catch((err) => {
  console.error("Error during main execution:", err);
})
.finally(async () => {
  await prisma.$disconnect();
});

module.exports = app;