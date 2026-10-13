// ===============================================================
// Assignment 9: Mini Project - Hospital Management System (HMS)
// Built with: Node.js, Express.js (REST API Architecture)
// File: server.js
// ===============================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database for Hospital Patients
let patients = [
    {
        id: 1,
        name: "Aarav Patel",
        age: 34,
        gender: "Male",
        phone: "9876543210",
        disease: "Hypertension",
        department: "Cardiology",
        doctor: "Dr. Rajesh Mehta",
        roomNumber: "C-104",
        status: "Admitted",
        admissionDate: "2026-10-10"
    },
    {
        id: 2,
        name: "Neha Sharma",
        age: 28,
        gender: "Female",
        phone: "9123456780",
        disease: "Acute Appendicitis",
        department: "General Surgery",
        doctor: "Dr. Ananya Roy",
        roomNumber: "S-208",
        status: "Admitted",
        admissionDate: "2026-10-12"
    },
    {
        id: 3,
        name: "Vikram Malhotra",
        age: 45,
        gender: "Male",
        phone: "9988776655",
        disease: "Fractured Femur",
        department: "Orthopedics",
        doctor: "Dr. Sunil Rao",
        roomNumber: "O-312",
        status: "Discharged",
        admissionDate: "2026-10-01"
    }
];

let nextPatientId = 4;

// Available Doctors & Departments for quick reference
const doctors = [
    { id: 1, name: "Dr. Rajesh Mehta", department: "Cardiology", available: true },
    { id: 2, name: "Dr. Ananya Roy", department: "General Surgery", available: true },
    { id: 3, name: "Dr. Sunil Rao", department: "Orthopedics", available: false },
    { id: 4, name: "Dr. Priya Verma", department: "Pediatrics", available: true },
    { id: 5, name: "Dr. Rohan Kulkarni", department: "Neurology", available: true }
];

// -------------------------------------------------------------
// 1. CREATE: Admit a new patient (POST /api/patients)
// -------------------------------------------------------------
app.post('/api/patients', (req, res) => {
    const { name, age, gender, phone, disease, department, doctor, roomNumber, status } = req.body;

    // Validation
    if (!name || !age || !gender || !disease || !department) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: name, age, gender, disease, and department are mandatory."
        });
    }

    const newPatient = {
        id: nextPatientId++,
        name,
        age: parseInt(age),
        gender,
        phone: phone || "N/A",
        disease,
        department,
        doctor: doctor || "Unassigned",
        roomNumber: roomNumber || "General Ward",
        status: status || "Admitted",
        admissionDate: new Date().toISOString().split('T')[0]
    };

    patients.push(newPatient);

    return res.status(201).json({
        success: true,
        message: "Patient registered and admitted successfully",
        data: newPatient
    });
});

// -------------------------------------------------------------
// 2. READ ALL: Get all patients with optional filtering (GET /api/patients)
// -------------------------------------------------------------
app.get('/api/patients', (req, res) => {
    const { status, department } = req.query;
    let filtered = [...patients];

    if (status) {
        filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }

    if (department) {
        filtered = filtered.filter(p => p.department.toLowerCase() === department.toLowerCase());
    }

    return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

// -------------------------------------------------------------
// 3. READ ONE: Get single patient by ID (GET /api/patients/:id)
// -------------------------------------------------------------
app.get('/api/patients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            success: false,
            message: `Patient with ID ${id} not found.`
        });
    }

    return res.status(200).json({
        success: true,
        data: patient
    });
});

// -------------------------------------------------------------
// 4. UPDATE (FULL): Update patient record (PUT /api/patients/:id)
// -------------------------------------------------------------
app.put('/api/patients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            success: false,
            message: `Patient with ID ${id} not found.`
        });
    }

    const { name, age, gender, phone, disease, department, doctor, roomNumber, status } = req.body;

    if (!name || !age || !disease || !department) {
        return res.status(400).json({
            success: false,
            message: "name, age, disease, and department are required for full update."
        });
    }

    patient.name = name;
    patient.age = parseInt(age);
    if (gender) patient.gender = gender;
    if (phone) patient.phone = phone;
    patient.disease = disease;
    patient.department = department;
    if (doctor) patient.doctor = doctor;
    if (roomNumber) patient.roomNumber = roomNumber;
    if (status) patient.status = status;

    return res.status(200).json({
        success: true,
        message: "Patient record completely updated",
        data: patient
    });
});

// -------------------------------------------------------------
// 5. UPDATE (PARTIAL): Modify specific fields like status (PATCH /api/patients/:id)
// -------------------------------------------------------------
app.patch('/api/patients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            success: false,
            message: `Patient with ID ${id} not found.`
        });
    }

    const fields = ['name', 'age', 'gender', 'phone', 'disease', 'department', 'doctor', 'roomNumber', 'status'];

    fields.forEach(field => {
        if (req.body[field] !== undefined) {
            patient[field] = field === 'age' ? parseInt(req.body[field]) : req.body[field];
        }
    });

    return res.status(200).json({
        success: true,
        message: "Patient record partially updated",
        data: patient
    });
});

// -------------------------------------------------------------
// 6. DELETE: Discharge / remove patient (DELETE /api/patients/:id)
// -------------------------------------------------------------
app.delete('/api/patients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = patients.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Patient with ID ${id} not found.`
        });
    }

    const dischargedPatient = patients.splice(index, 1)[0];

    return res.status(200).json({
        success: true,
        message: `Patient ${dischargedPatient.name} discharged and record removed.`,
        data: dischargedPatient
    });
});

// -------------------------------------------------------------
// 7. READ DOCTORS: (GET /api/doctors)
// -------------------------------------------------------------
app.get('/api/doctors', (req, res) => {
    res.status(200).json({
        success: true,
        count: doctors.length,
        data: doctors
    });
});

// -------------------------------------------------------------
// 8. Hospital Stats summary: (GET /api/stats)
// -------------------------------------------------------------
app.get('/api/stats', (req, res) => {
    const totalPatients = patients.length;
    const admitted = patients.filter(p => p.status === 'Admitted').length;
    const discharged = patients.filter(p => p.status === 'Discharged').length;
    const totalDoctors = doctors.length;

    res.status(200).json({
        success: true,
        data: { totalPatients, admitted, discharged, totalDoctors }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🏥 Hospital Management System running at: http://localhost:${PORT}`);
    console.log(`📡 Patient REST API: http://localhost:${PORT}/api/patients`);
    console.log(`=======================================================`);
});
