
import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentDetails from "./components/StudentDetails";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  function addStudent(student) {
    setStudents((previousStudents) => [
      ...previousStudents,
      student
    ]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Student Information System</h1>
        <p>React Components Assignment - 6</p>
      </header>

      <main className="container">
        <StudentForm onAddStudent={addStudent} />

        <StudentDetails students={students} />
      </main>

      <footer>
        <p>Student Information Application using React</p>
      </footer>
    </div>
  );
}

export default App;
