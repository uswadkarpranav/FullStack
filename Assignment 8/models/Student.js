// ==========================================
// File: models/Student.js
// Purpose: Mongoose Schema & Model for Student Records
// ==========================================

const mongoose = require('mongoose');

/**
 * Student Schema definition:
 * Defines the structure, data types, and validation rules for documents in the "students" collection.
 */
const studentSchema = new mongoose.Schema(
    {
        rollNo: {
            type: String,
            required: [true, 'Student Roll Number is required'],
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, 'Student Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Student Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address'
            ]
        },
        course: {
            type: String,
            required: [true, 'Course name is required'],
            trim: true
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [1, 'Age must be greater than 0']
        },
        grade: {
            type: String,
            default: 'A',
            trim: true
        }
    },
    {
        // Automatically adds createdAt and updatedAt timestamp fields
        timestamps: true
    }
);

// Compile schema into a model named 'Student'
// Mongoose maps this to a MongoDB collection named 'students' (lowercase plural)
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
