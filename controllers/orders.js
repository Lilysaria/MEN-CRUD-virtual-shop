const Order = require('../models/order');
const Product = require('../models/Product');

module.exports = { 
    addToCart,
   viewCart
  
};


async function addToCart(req, res) {
    try {
        // get productId and quantity from request body
        //equivalent to const productId = req.body.productId const quantity = req.body.quantity
        const { productId, quantity } = req.body;

        // find the product using Product model
        //Product.findById(productId) is an async operation that searches databse for productId
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Find or create the users cart in the database
        let cart;
        if (req.user) {
            // user is logged in, use their _id
            cart = await Order.findOne({ userId: req.user._id, status: 'cart' });
        } else {
            // user not logged in, use a default value for userId
            cart = await Order.findOne({ userId: null, status: 'cart' });
        }

        if (!cart) {
            // if cart doesn't exist, create a new one
            cart = new Order({ userId: req.user ? req.user._id : null, status: 'cart', products: [] });
        }

        // add or update the product in the cart
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            // product exists in cart, update quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // add to cart
            cart.products.push({ productId, quantity, price: product.price });
        }

        // calculate total price for the cart
        cart.totalPrice = cart.products.reduce((total, item) => total + (item.quantity * item.price), 0);

        // save the cart to the database
        await cart.save();

        // redirect or send response
        res.redirect("/orders/cart")
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send(error.message);
    }
}
 
async function viewCart(req, res) {
    try {
        
        const userId = req.user ? req.user._id : null; 
        const cart = await Order.findOne({ userId, status: 'cart' }).populate('products.productId');

        if (!cart) {
          
            return res.render('products/empty-cart');
        }

        // render the cart view with cart data
        res.render('products/cart', { cart });
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).send("Error viewing cart");
    }
}