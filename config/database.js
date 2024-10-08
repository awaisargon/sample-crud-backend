const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    mongoose.set('strictQuery', false);
    // Ensure MONGODB_URI is present
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection URI is missing in environment variables');
    }

    // Connect to the database
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of the default 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    // Retry connection logic (e.g., in case of network instability)
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }

  // Handle connection errors after the initial connection
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB encountered an error:', err.message);
  });

  // Handle disconnection cases and attempt to reconnect
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
    connectDB();  // Automatically reconnect on disconnection
  });
};

module.exports = connectDB;
