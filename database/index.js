// Import connectDB from parent folder
const connectDB = require("../connectDB");

// Export a function that initializes the database connection
module.exports = () => connectDB();
