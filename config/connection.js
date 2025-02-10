const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const databaseUrl = process.env.CONNECTION_STRING;
  // console.log('MongoDB URI:', databaseUrl);

  try {
    await mongoose.connect(databaseUrl);
    // await mongoose.connect("mongodb://user:password@address/db", {
    //   server: {
    //     socketOptions: {
    //       socketTimeoutMS: 0,
    //       connectionTimeout: 0
    //     }
    //   }
    // });
    console.log('MongoDB connected successfully');
    console.log('Connected to database:', mongoose.connection.name);
    mongoose.connection.on('open', () => {
      mongoose.connection.db.listCollections().toArray((err, names) => {
        console.log('Collections in database:', names);
      });
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
