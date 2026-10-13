# Assignment 8: Student Records REST API

A complete, production-ready RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** to perform full **CRUD** (Create, Read, Update, Delete) operations on student records.

Tested and verified with **Postman**. Includes an exportable Postman Collection and comprehensive code explanations for exams/viva.

---

## 📁 Project Directory Structure

```text
Assignment 8/
├── config/
│   └── db.js                                   # MongoDB database connection logic
├── controllers/
│   └── studentController.js                    # Business logic for all 5 CRUD operations
├── models/
│   └── Student.js                              # Mongoose schema and model definition
├── routes/
│   └── studentRoutes.js                        # Express router mapping URLs to controllers
├── .env                                        # Environment configuration (Port, Mongo URI)
├── .env.example                                # Template for environment variables
├── Assignment8_Students_Postman_Collection.json # Importable Postman collection
├── package.json                                # Project dependencies and start scripts
├── README.md                                   # Documentation and Viva explanation guide
└── server.js                                   # Main Express server entry point
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime for executing server-side code |
| **Framework** | Express.js | Web framework for routing and middleware handling |
| **Database** | MongoDB | NoSQL document database to store student data |
| **ODM** | Mongoose | Object Data Modeling library for schema validation & queries |
| **Environment** | dotenv | Loads environment variables securely from `.env` |
| **Middleware** | cors | Cross-Origin Resource Sharing enablement |
| **Dev Tool** | nodemon | Automatically reloads server on file changes |
| **Testing** | Postman | API endpoint testing and documentation |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB**: Either a local MongoDB instance (`mongod`) running on port `27017` **OR** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud cluster.

### 2. Configure Environment Variables (`.env`)
Open `.env` in the root folder:
```env
PORT=5000
# For Local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/student_records_db

# OR for MongoDB Atlas (Cloud):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_records_db?retryWrites=true&w=majority
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
- **Production mode:**
  ```bash
  npm start
  ```
- **Development mode (auto-reload on save):**
  ```bash
  npm run dev
  ```

When running, the console will display:
```text
====================================================
🚀 Assignment 8 Server running on: http://localhost:5000
📡 API Endpoints base: http://localhost:5000/api/students
====================================================
[MongoDB Connected]: Host -> 127.0.0.1
```

---

## 📋 REST API Endpoints Summary

| Operation | HTTP Method | Endpoint | Description | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| **Health Check** | `GET` | `/` | API status and route documentation | `200 OK` |
| **CREATE** | `POST` | `/api/students` | Add a new student record | `201 Created` |
| **READ ALL** | `GET` | `/api/students` | Get all student records | `200 OK` |
| **READ ONE** | `GET` | `/api/students/:id` | Get single student by MongoDB `_id` | `200 OK` |
| **UPDATE** | `PUT` | `/api/students/:id` | Update existing student by `_id` | `200 OK` |
| **DELETE** | `DELETE` | `/api/students/:id` | Delete student by `_id` | `200 OK` |

---

## 📬 Step-by-Step Postman Testing Guide

An importable Postman collection file `Assignment8_Students_Postman_Collection.json` is included.

### How to Import into Postman:
1. Open **Postman**.
2. Click the **Import** button (top-left).
3. Drag & drop `Assignment8_Students_Postman_Collection.json`.
4. All 5 CRUD requests will appear under **Assignment 8 - Student Records CRUD API**.

---

### Request Details & Sample Payloads

#### 1. CREATE Student (`POST /api/students`)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "rollNo": "CS101",
  "name": "Pranav Sharma",
  "email": "pranav@example.com",
  "course": "Computer Science",
  "age": 21,
  "grade": "A"
}
```
- **Expected Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Student record created successfully",
  "data": {
    "_id": "670bf3c45789a123bc456def",
    "rollNo": "CS101",
    "name": "Pranav Sharma",
    "email": "pranav@example.com",
    "course": "Computer Science",
    "age": 21,
    "grade": "A",
    "createdAt": "2026-10-13T12:00:00.000Z",
    "updatedAt": "2026-10-13T12:00:00.000Z",
    "__v": 0
  }
}
```

---

#### 2. READ All Students (`GET /api/students`)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "message": "All student records retrieved successfully",
  "data": [
    {
      "_id": "670bf3c45789a123bc456def",
      "rollNo": "CS101",
      "name": "Pranav Sharma",
      "email": "pranav@example.com",
      "course": "Computer Science",
      "age": 21,
      "grade": "A"
    }
  ]
}
```

---

#### 3. READ Student By ID (`GET /api/students/:id`)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/670bf3c45789a123bc456def`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student record found",
  "data": {
    "_id": "670bf3c45789a123bc456def",
    "rollNo": "CS101",
    "name": "Pranav Sharma",
    "email": "pranav@example.com",
    "course": "Computer Science",
    "age": 21,
    "grade": "A"
  }
}
```

---

#### 4. UPDATE Student By ID (`PUT /api/students/:id`)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/670bf3c45789a123bc456def`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Pranav S.",
  "age": 22,
  "grade": "A+"
}
```
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student record updated successfully",
  "data": {
    "_id": "670bf3c45789a123bc456def",
    "rollNo": "CS101",
    "name": "Pranav S.",
    "email": "pranav@example.com",
    "course": "Computer Science",
    "age": 22,
    "grade": "A+",
    "updatedAt": "2026-10-13T12:05:00.000Z"
  }
}
```

---

#### 5. DELETE Student By ID (`DELETE /api/students/:id`)
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/670bf3c45789a123bc456def`
- **Expected Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student record deleted successfully",
  "deletedRecord": {
    "_id": "670bf3c45789a123bc456def",
    "rollNo": "CS101",
    "name": "Pranav S."
  }
}
```

---

## 🧠 Code Architecture & Viva Explanation Guide

When presenting or explaining this code in class or viva, explain it using these key concepts:

### 1. `server.js` (Entry Point)
- **Role:** Sets up the HTTP server, registers middleware, mounts routes, and initiates the database connection.
- **Key Middlewares:**
  - `express.json()`: Parses incoming HTTP requests with JSON payloads so they are accessible via `req.body`.
  - `cors()`: Enables Cross-Origin Resource Sharing so browser clients running on other ports can safely access the API.
  - Global error handler & 404 handler: Catches unexpected crashes and invalid routes gracefully.

### 2. `config/db.js` (Database Connection)
- Uses `mongoose.connect()` with `process.env.MONGO_URI`.
- Uses asynchronous `try/catch` block to handle connection errors without crashing the process.
- Includes `serverSelectionTimeoutMS: 5000` to fail fast with informative logs if MongoDB is not running.

### 3. `models/Student.js` (Data Modeling)
- **What is a Schema?** A blueprint in Mongoose defining the document structure, fields, and constraints.
- **Validations applied:**
  - `rollNo`: Required, unique, trimmed.
  - `email`: Required, unique, trimmed, validated via regex (`/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/`).
  - `name`, `course`, `age`: Required fields. `age` has `min: 1`.
  - `timestamps: true`: Automatically generates and updates `createdAt` and `updatedAt`.

### 4. `controllers/studentController.js` (CRUD Business Logic)
- **Create (`createStudent`):**
  - Validates presence of required fields.
  - Checks if a student with the same `rollNo` or `email` already exists using `$or`.
  - Instantiates `new Student(...)` and saves using `.save()`.
  - Returns HTTP `201 Created`.
- **Read All (`getAllStudents`):**
  - Calls `Student.find().sort({ createdAt: -1 })` to return all records sorted newest first.
  - Returns HTTP `200 OK`.
- **Read One (`getStudentById`):**
  - Validates MongoDB `ObjectId` using `mongoose.Types.ObjectId.isValid(id)`.
  - Calls `Student.findById(id)`. Returns `404 Not Found` if missing.
- **Update (`updateStudent`):**
  - Uses `Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`.
  - `{ new: true }` returns the modified document rather than the old document.
  - `{ runValidators: true }` ensures updated fields still respect schema constraints.
- **Delete (`deleteStudent`):**
  - Uses `Student.findByIdAndDelete(id)`.
  - Returns `404` if not found, or `200` with the deleted record.

### 5. `routes/studentRoutes.js` (Routing & Modularization)
- Uses `express.Router()`.
- Chaining with `.route('/')` and `.route('/:id')` creates clean, readable endpoints.
- Includes `checkDbConnection` middleware to verify database readiness before executing queries.

---

## ❓ Frequently Asked Viva Questions

1. **What is REST and why is it stateless?**
   - REST stands for *Representational State Transfer*. It is stateless because the server does not store client session state between requests; every request must contain all the information necessary to understand and process it.
2. **What is the difference between SQL and NoSQL?**
   - SQL databases (e.g. MySQL, PostgreSQL) are relational, table-based, with fixed schemas and strict relations. NoSQL databases (e.g. MongoDB) are non-relational, document-oriented (BSON/JSON), schema-flexible, and easily horizontally scalable.
3. **Why do we use Mongoose instead of native MongoDB driver?**
   - Mongoose provides Schema definition, built-in type casting, validation rules, query building, middleware hooks, and model abstraction, saving boilerplate code.
4. **What is the difference between PUT and PATCH?**
   - `PUT` replaces the entire resource or modifies specified fields based on controller implementation, while `PATCH` applies partial modifications to specific fields.
5. **What do the HTTP Status Codes mean?**
   - `200 OK`: Successful GET, PUT, or DELETE.
   - `201 Created`: Successful POST request that created a new resource.
   - `400 Bad Request`: Client error (missing required fields, validation failure, duplicate key).
   - `404 Not Found`: Requested resource ID does not exist.
   - `500 Internal Server Error`: Unhandled server exception.
   - `503 Service Unavailable`: Database is offline or unreachable.
