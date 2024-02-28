const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');


//add a product to cart
router.post('/cart/add', orders.addToCart);


module.exports = router;