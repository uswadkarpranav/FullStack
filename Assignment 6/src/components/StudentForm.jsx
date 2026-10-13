
import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [marks, setMarks] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onAddStudent({
      name,
      rollNumber,
      department,
      marks
    });

    setName("");
    setRollNumber("");
    setDepartment("");
    setMarks("");
  }

  return (
    <section className="card">
      <h2>Student Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />

        <label>Roll Number</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter roll number"
          required
        />

        <label>Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="Computer Engineering">
            Computer Engineering
          </option>
          <option value="Mechanical Engineering">
            Mechanical Engineering
          </option>
          <option value="Electrical Engineering">
            Electrical Engineering
          </option>
          <option value="Civil Engineering">
            Civil Engineering
          </option>
        </select>

        <label>Marks (out of 100)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks"
          required
        />

        <button type="submit">Submit Student Details</button>
      </form>
    </section>
  );
}

export default StudentForm;
