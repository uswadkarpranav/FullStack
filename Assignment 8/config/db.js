// ==========================================
// File: config/db.js
// Purpose: MongoDB Database Connection Setup
// ==========================================

const mongoose = require('mongoose');

/**
 * connectDB: Asynchronous function to connect to MongoDB using Mongoose.
 * Connects to process.env.MONGO_URI or falls back to local MongoDB.
 */
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_records_db';
    
    try {
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 8000,
            tls: true,
            tlsAllowInvalidCertificates: true // Prevents OpenSSL TLS 1.3 alert 80 issue on Windows Node.js v22+
        });
        console.log(`[MongoDB Connected]: Host -> ${conn.connection.host}`);
    } catch (error) {
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        console.error('Hint: Ensure MongoDB is running locally (mongod) or check network connectivity to MongoDB Atlas.');
    }
};

module.exports = connectDB;
