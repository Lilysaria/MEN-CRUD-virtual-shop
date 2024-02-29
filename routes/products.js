const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

// route for showing the form to add a new product
router.get('/new', products.showAddProductForm);

// route for creating a new product
router.post('/', products.createProduct);

// route for listing all products
router.get('/', products.listProducts);

router.get('/:productId', products.viewProduct);

router.get('/:productId/edit', products.showEditProductForm);

router.put('/:productId', products.updateProduct);

router.delete('/:productId', products.deleteProduct);

module.exports = router;
