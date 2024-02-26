var express = require('express');
var router = express.Router();
const passport = require('passport');

// GET home page
router.get('/', function(req, res) {
  // Render the actual homepage instead of redirecting to itself
  res.render('index', { title: 'Welcome' });
});

//  login process by making a GET request to /auth/google
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
// opitionally force pick account each time add the key value pair
	  // prompt: 'select_account'
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/', // Redirect to the homepage or another success page upon successful login
    failureRedirect: '/' // Redirect back to the homepage or a login page upon failure
  }
));

// logout route
router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/'); // Redirect to the homepage or a login page upon logout
  });
});

module.exports = router;
