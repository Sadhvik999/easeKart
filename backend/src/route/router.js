const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../auth/auth.js');
const { getAllProducts , getProductById } = require('../products/product.js');
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
module.exports = { router };