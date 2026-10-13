# Assignment 9: Building CRUD REST API using Express.js & Hospital Management Mini Project

Created in: `C:\Users\prana\OneDrive\Desktop\FullStack\Class\Assignment 9`

---

## 📁 Projects Included

### 1. `articles-crud-api` (Exact Tutorial Implementation)
Implements the exact instructed REST API for managing articles using an in-memory data store with Express.js.

- **Port:** `3000`
- **File:** `app.js`
- **Postman Collection:** `Articles_CRUD_Postman_Collection.json`
- **Endpoints:**
  - `POST   /articles` — Create article (Status: 201)
  - `GET    /articles` — Get all articles (Status: 200)
  - `GET    /articles/:id` — Get single article (Status: 200 / 404)
  - `PUT    /articles/:id` — Full update article (Status: 200 / 404)
  - `PATCH  /articles/:id` — Partial update article (Status: 200 / 404)
  - `DELETE /articles/:id` — Delete article (Status: 200 / 404)

**To run:**
```bash
cd "C:\Users\prana\OneDrive\Desktop\FullStack\Class\Assignment 9\articles-crud-api"
node app.js
```

---

### 2. `hospital-management-system` (Mini Project)
A complete Hospital Management System (HMS) REST API with interactive frontend dashboard.

- **Port:** `4000`
- **File:** `server.js`
- **Frontend UI:** `public/index.html` (Accessible at `http://localhost:4000`)
- **Postman Collection:** `Hospital_Management_Postman_Collection.json`
- **Endpoints:**
  - `POST   /api/patients` — Admit a new patient
  - `GET    /api/patients` — Get all patients (supports `?status=` and `?department=` filters)
  - `GET    /api/patients/:id` — Get single patient details
  - `PUT    /api/patients/:id` — Full update patient records
  - `PATCH  /api/patients/:id` — Partial update (e.g. toggle Admitted/Discharged)
  - `DELETE /api/patients/:id` — Discharge & remove patient
  - `GET    /api/doctors` — List of doctors & availability
  - `GET    /api/stats` — Real-time hospital metrics (total, admitted, discharged)

**To run:**
```bash
cd "C:\Users\prana\OneDrive\Desktop\FullStack\Class\Assignment 9\hospital-management-system"
npm start
```
Then open `http://localhost:4000` in your web browser.

---

## 📝 Suggested Quiz Answer

**Question:** Which HTTP method is commonly used to create a new resource in a REST API?  
**Answer:** **C: POST**
