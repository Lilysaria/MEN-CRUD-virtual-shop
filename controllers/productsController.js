const Product = require('../models/Product');

// display form for adding a new product
exports.showAddProductForm = (req, res) => {
  res.render('addProduct', { product: {}, formAction: "/products", formMethod: "POST" });
};

// display  form for editing an existing product
exports.showEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('addProduct', { product: product, formAction: "/products/" + product._id + "?_method=PUT", formMethod: "POST" });
  } catch (error) {
    console.error('Error finding product for edit:', error);
    res.status(500).send(error);
  }
};

// create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
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

// show a single product by id
exports.showProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('showProduct', { product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send(error);
  }
};

// update an existing product
exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products/' + req.params.id);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send(error);
  }
};

// delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send(error);
  }
};
