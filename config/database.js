// THE PURPOSE OF THIS FILE
// is to establish a connection between our express server
// and our database on mongodb atlas! 

// mongoose is the module that allows us to create that connection!
const mongoose = require("mongoose");

// export the function that creates a database connection
module.exports = {
  connectDB,
};

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.log("err");
    console.log(err, ' connecting to mongodb')
    process.exit(1);
  }
}