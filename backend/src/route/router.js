const express = require('express');
const router = express.Router();
const { signup, login, logout, getProfile } = require('../auth/auth.js');
const { verifyToken } = require('../auth/middleware.js');
const { getAllProducts, getProductById, getProductByCategory, searchProducts } = require('../products/product.js');
// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifyToken, getProfile);

// Database products routes
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getProductByCategory/:category', getProductByCategory);
router.get('/searchProducts', searchProducts);
module.exports = { router };