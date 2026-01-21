import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoDB_URL = process.env.MongoDB_URL || 'mongodb://0.0.0.0:27017/ecommerceDB';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes); // Auth routes with JWT
app.use('/api', productRoutes); // Product routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'E-commerce API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Connect to MongoDB
mongoose.connect(mongoDB_URL)
    .then(() => {
        console.log('MongoDB Connected Successfully!');
        // Start server after DB connection
        app.listen(port, () => {
            console.log(`🚀 E-commerce Server listening at http://localhost:${port}`);
            console.log(`📦 Database: ${mongoDB_URL}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    });

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

