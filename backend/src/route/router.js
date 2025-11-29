const express = require('express');
const router = express.Router();
const { signup, login, logout, getProfile } = require('../auth/auth.js');
const { verifyToken } = require('../auth/middleware.js');
const { getAllProducts, getProductById, getProductByCategory, searchProducts } = require('../products/product.js');
const { addToCart, getCart, updateCartItem, removeCartItem } = require('../cart/cart.js');
const { getAddresses, addAddress } = require('../address/address.js');
const { createOrder } = require('../order/order.js');
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

// Cart routes
router.post('/cart/add', verifyToken, addToCart);
router.get('/cart', verifyToken, getCart);
router.put('/cart/update', verifyToken, updateCartItem);
router.delete('/cart/remove', verifyToken, removeCartItem);

// Address routes
router.get('/address', verifyToken, getAddresses);
router.post('/address', verifyToken, addAddress);

// Order routes
router.post('/order/checkout', verifyToken, createOrder);
module.exports = { router };