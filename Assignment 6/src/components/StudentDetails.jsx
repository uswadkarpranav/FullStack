
function StudentDetails({ students }) {
  return (
    <section className="card">
      <h2>Student Details</h2>

      {students.length === 0 ? (
        <p className="empty">
          No student details submitted yet.
        </p>
      ) : (
        <div className="student-list">
          {students.map((student, index) => (
            <div className="student-card" key={student.rollNumber}>
              <h3>Student {index + 1}</h3>

              <p>
                <strong>Name:</strong> {student.name}
              </p>

              <p>
                <strong>Roll Number:</strong> {student.rollNumber}
              </p>

              <p>
                <strong>Department:</strong> {student.department}
              </p>

              <p>
                <strong>Marks:</strong> {student.marks}/100
              </p>

              <p>
                <strong>Percentage:</strong> {student.marks}%
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudentDetails;
