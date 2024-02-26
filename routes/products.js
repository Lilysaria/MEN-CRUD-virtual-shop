const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/new', productsController.showAddProductForm); // route for showing add new product form
router.get('/:id/edit', productsController.showEditProductForm); // route for editing a product


router.post('/', productsController.createProduct);
router.get('/', productsController.listProducts);
router.get('/:id', productsController.showProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
