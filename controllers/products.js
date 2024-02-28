const Product = require('../models/Product');

module.exports = {
  showAddProductForm,
  createProduct,
  listProducts,
  viewProduct,
  showEditProductForm,
  updateProduct
};

// display form for adding a new product | CRUD: Create (Form Display)
async function showAddProductForm(req, res) {
  res.render('products/new', { product: {}, formAction: "/products", formMethod: "POST" });
}

// create a new product | CRUD: Create 
async function createProduct(req, res) {
  try {
    const createdProduct = await Product.create(req.body);
    console.log(createdProduct, " <- createdProduct"); // Debugging purpose
    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error); 
   
    res.status(500).send(error.message); 
  }
}

// list all products | CRUD: Read (listing)
async function listProducts(req, res) {
  try {
    const products = await Product.find({});
    res.render('products/index', { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send(error);
  }
}

// view single product | CRUD: Read (ingle Item)
async function viewProduct(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/show', { product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send(error);
  }
}


async function showEditProductForm(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/edit', { product }); // render the edit view with the product data
  } catch (error) {
    console.error('Error showing edit form:', error);
    res.status(500).send(error.toString());
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // update the product with new values from req.body
    product.set(req.body);

    // save the updated product
    await product.save();

    // redirect
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send(error);
  }
}