import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import cors
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

// Importing routes
import cdevicesRoutes from "./routes/Cdevices.route.js";
import customerRoutes from "./routes/Customer.route.js";
import devicesRoutes from "./routes/Devices.route.js";
import ldevicesRoutes from "./routes/Ldevices.route.js";
import planRoutes from "./routes/Plan.route.js";
import profileRoutes from "./routes/Profile.route.js";
import transactionRoutes from "./Routes/Transaction.route.js";

// MongoDB URI and JWT Secret
const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/domestic';
const jwtSecret = '6f9e76f86d325b506e891130ad7fb84f81a263c44a1d0b3bceb6b28ea53c9334';

if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(mongodbUri)
    .then(() => {
        console.log("Succeeded to connect to MongoDB 🚀");
    })
    .catch((err) => console.log('MongoDB connection error:', err));

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the client build directory
const clientBuildPath = path.join(__dirname, '../client/dist');

// Initialize Express
const app = express();
app.use(express.json());
app.use(cookieParser());

// Add CORS middleware
app.use(cors({
    origin: '*', // Allow all origins (for development only; specify your domain in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Use imported routes
app.use('/api/cdevices', cdevicesRoutes); // Route for Cdevices
app.use('/api/customers', customerRoutes); // Route for Customers
app.use('/api/devices', devicesRoutes); // Route for Devices
app.use('/api/ldevices', ldevicesRoutes); // Route for Ldevices
app.use('/api/plans', planRoutes); // Route for Plans
app.use('/api/profiles', profileRoutes); // Route for Profiles
app.use('/api/transactions', transactionRoutes); // Route for Transactions

// Serve static files from the client build directory
app.use(express.static(clientBuildPath));

// Serve the index.html file for all other routes (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    console.error(err.stack);
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

// Define the PORT and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
