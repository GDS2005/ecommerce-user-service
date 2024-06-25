const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');

// Load environment variables from a .env file into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Connect to the MongoDB database
db();

// Parse incoming JSON requests
app.use(express.json());

// Handle requests from different origins
app.use(cors());

// Secure the app by setting various HTTP headers
app.use(helmet());

// v1 api routes
app.use('/v1', require('./routes/v1/'));

// Set the port for the server to listen on, using the value from environment variables or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Error-handling middleware
app.use(error);

// Start the server and listen on the specified port, logging a message to the console when it starts
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));