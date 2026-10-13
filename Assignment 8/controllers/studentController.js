// ==========================================
// File: controllers/studentController.js
// Purpose: Controller functions for CRUD operations on Student records
// ==========================================

const mongoose = require('mongoose');
const Student = require('../models/Student');

/**
 * @desc    1. CREATE a new student record
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res) => {
    try {
        const { rollNo, name, email, course, age, grade } = req.body;

        // Basic presence validation
        if (!rollNo || !name || !email || !course || !age) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: rollNo, name, email, course, age'
            });
        }

        // Check for duplicate roll number or email
        const existingStudent = await Student.findOne({
            $or: [{ rollNo: rollNo }, { email: email.toLowerCase() }]
        });

        if (existingStudent) {
            const duplicateField = existingStudent.rollNo === rollNo ? 'Roll Number' : 'Email';
            return res.status(400).json({
                success: false,
                message: `Student with this ${duplicateField} already exists.`
            });
        }

        // Create new student document
        const newStudent = new Student({
            rollNo,
            name,
            email,
            course,
            age,
            grade
        });

        // Save to MongoDB
        const savedStudent = await newStudent.save();

        return res.status(201).json({
            success: true,
            message: 'Student record created successfully',
            data: savedStudent
        });
    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error while creating student',
            error: error.message
        });
    }
};

/**
 * @desc    2. READ all student records
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res) => {
    try {
        // Fetch all documents from the students collection, sorted by newest first
        const students = await Student.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: students.length,
            message: 'All student records retrieved successfully',
            data: students
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching students',
            error: error.message
        });
    }
};

/**
 * @desc    3. READ a single student record by MongoDB _id
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Student ID format: '${id}'`
            });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found with ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Student record found',
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while retrieving student',
            error: error.message
        });
    }
};

/**
 * @desc    4. UPDATE a student record by ID
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Student ID format: '${id}'`
            });
        }

        // findByIdAndUpdate with { new: true } returns the modified document instead of original
        // { runValidators: true } ensures updated values adhere to schema rules
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: `Cannot update. Student not found with ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Student record updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        // Handle unique constraint duplicate key error (MongoDB error code 11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `Duplicate field value entered: ${field} '${error.keyValue[field]}' already exists.`
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error while updating student',
            error: error.message
        });
    }
};

/**
 * @desc    5. DELETE a student record by ID
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid Student ID format: '${id}'`
            });
        }

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: `Cannot delete. Student not found with ID: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Student record deleted successfully',
            deletedRecord: deletedStudent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting student',
            error: error.message
        });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
