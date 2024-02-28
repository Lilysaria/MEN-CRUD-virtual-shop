const Order = require('../models/order');
const Product = require('../models/Product');

module.exports = { 
    addToCart
   
  
};


async function addToCart(req, res) {
    const Product = require('../models/Product');

    try {
        // get productId and quantity from request body
        const { productId, quantity } = req.body;

        // the cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = { items: [] };
        }

        // Find the product 
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('product not found');
        }

        // add or update the product in the cart
        const existingProductIndex = req.session.cart.items.findIndex(item => item.productId === productId);
        if (existingProductIndex > -1) {
            // product exists in cart, update quantity
            req.session.cart.items[existingProductIndex].quantity += quantity;
        } else {
            // product does not exist in cart, add new item
            req.session.cart.items.push({ productId, quantity, price: product.price });
        }

        // calculate total price for the cart
        req.session.cart.totalPrice = req.session.cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

        res.status(200).json(req.session.cart);
    } catch (error) {
        console.error('error adding to cart:', error);
        res.status(500).send(error.message);
    }
}
