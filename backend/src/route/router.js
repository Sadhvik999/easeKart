const express = require('express');
const router = express.Router();
const { signup, login, logout, getProfile, updateProfile, changePassword } = require('../auth/auth.js');
const { verifyToken } = require('../auth/middleware.js');
const { getAllProducts, getProductById, getProductByCategory, searchProducts, getCategories, createProduct, updateProduct, deleteProduct, getMyProducts } = require('../products/product.js');
const { addToCart, getCart, updateCartItem, removeCartItem } = require('../cart/cart.js');
const { getAddresses, addAddress } = require('../address/address.js');
const { createOrder } = require('../order/order.js');
// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/profile/password', verifyToken, changePassword);

// Database products routes
router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getProductByCategory/:category', getProductByCategory);
router.get('/searchProducts', searchProducts);
router.get('/categories', getCategories);
router.get('/my-products', verifyToken, getMyProducts);
router.post('/products', verifyToken, createProduct);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

// Cart routes
router.post('/cart/add', verifyToken, addToCart);
router.get('/cart', verifyToken, getCart);
router.put('/cart/update', verifyToken, updateCartItem);
router.delete('/cart/remove', verifyToken, removeCartItem);

// Address routes
router.get('/address', verifyToken, getAddresses);
router.post('/address', verifyToken, addAddress);

// Order routes
// Order routes
router.post('/order/checkout', verifyToken, createOrder);

// Notification routes
const { getNotifications, markAsRead } = require('../notification/notification.js');
router.get('/notifications', verifyToken, getNotifications);
router.put('/notifications/:id/read', verifyToken, markAsRead);

module.exports = { router };