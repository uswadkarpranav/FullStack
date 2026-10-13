// ==========================================
// Assignment 8: Student Records REST API
// Tech Stack: Node.js, Express.js, MongoDB (Mongoose)
// File: server.js (Main Entry Point)
// ==========================================

// 1. Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// 2. Initialize the Express application
const app = express();

// 3. Built-in and Third-party Middlewares
// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse incoming JSON requests in req.body
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static web pages from the "public" directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 5. API Status Route (available at /api)
app.get('/api', (req, res) => {
    res.status(200).json({
        assignment: 'Assignment 8: Student Records Management REST API',
        techStack: 'Node.js, Express.js, MongoDB, Mongoose',
        status: 'Server is running smoothly',
        endpoints: {
            'POST /api/students': 'Create a new student record',
            'GET /api/students': 'Retrieve all student records',
            'GET /api/students/:id': 'Retrieve a specific student by ID',
            'PUT /api/students/:id': 'Update a student record by ID',
            'DELETE /api/students/:id': 'Delete a student record by ID'
        }
    });
});

// 6. Mount Student API Routes
app.use('/api/students', studentRoutes);

// 7. 404 Not Found Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// 8. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('[Unhandled Error]:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error occurred',
        error: err.message
    });
});

// 9. Start the HTTP Server after MongoDB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    // 1. Connect to MongoDB first
    await connectDB();

    // 2. Then start listening for requests
    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🚀 Assignment 8 Server running on: http://localhost:${PORT}`);
        console.log(`🌐 Web UI: http://localhost:${PORT}`);
        console.log(`📡 API Endpoints base: http://localhost:${PORT}/api/students`);
        console.log(`====================================================`);
    });
};

startServer();
