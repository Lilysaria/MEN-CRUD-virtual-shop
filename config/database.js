// THE PURPOSE OF THIS FILE
// is to establish a connection between our express server
// and our database on mongodb atlas! 

// mongoose is the module that allows us to create that connection!
const mongoose = require('mongoose');

// This connects to mongodb atlas, using our environment variable
// process.env.VARIABLE_NAME is how you access the environment variable values
mongoose.connect(process.env.DATABASE_URL);
	
// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
	// This function runs when we establish a connection between our express server 
	// and mongodb!
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
