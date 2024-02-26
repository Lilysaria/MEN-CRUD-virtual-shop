const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

// route for showing the form to add a new product
router.get('/new', products.showAddProductForm);

// route for creating a new product
router.post('/', products.createProduct);

// route for listing all products
router.get('/', products.listProducts);

module.exports = router;
