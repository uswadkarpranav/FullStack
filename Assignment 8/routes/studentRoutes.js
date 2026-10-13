// ==========================================
// File: routes/studentRoutes.js
// Purpose: REST API Route definitions for Student CRUD operations
// ==========================================

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

/**
 * Middleware: Check if MongoDB is connected before querying
 * Returns an informative 503 error instead of timing out if DB is not reachable
 */
const checkDbConnection = (req, res, next) => {
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: 'Database is not connected. Please verify that MongoDB is running or check your MONGO_URI in .env.'
        });
    }
    next();
};

// Apply DB connection check to all student routes
router.use(checkDbConnection);

/**
 * Route: /api/students
 * - POST: Create a new student
 * - GET:  Retrieve all students
 */
router.route('/')
    .post(createStudent)
    .get(getAllStudents);

/**
 * Route: /api/students/:id
 * - GET:    Retrieve student by ID
 * - PUT:    Update student by ID
 * - DELETE: Delete student by ID
 */
router.route('/:id')
    .get(getStudentById)
    .put(updateStudent)
    .delete(deleteStudent);

module.exports = router;
