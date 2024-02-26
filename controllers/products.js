const Product = require('../models/Product');

// display form for adding a new product
exports.showAddProductForm = (req, res) => {
  res.render('addProduct', { product: {}, formAction: "/products", formMethod: "POST" });
};

// create a new product
exports.createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send(error);
  }
};

// list all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('productsList', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(error);
  }
};
