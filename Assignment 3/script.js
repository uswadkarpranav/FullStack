
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const studentCount = document.getElementById("studentCount");
const classAverage = document.getElementById("classAverage");
const topperDisplay = document.getElementById("topper");

let students = [];

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const roll = document.getElementById("roll").value.trim();
    const name = document.getElementById("name").value.trim();

    const marks = [
        "m1", "m2", "m3", "m4", "m5"
    ].map(id => Number(document.getElementById(id).value));

    if (!roll || !name) {
        alert("Please enter the roll number and student name.");
        return;
    }

    if (students.some(student => student.roll === roll)) {
        alert("This roll number already exists.");
        return;
    }

    if (marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = total / marks.length;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    const student = {
        roll,
        name,
        marks,
        total,
        percentage,
        grade
    };

    students.push(student);
    studentForm.reset();

    displayStudents();
});

function displayStudents() {
    studentTable.innerHTML = "";

    if (students.length === 0) {
        studentTable.innerHTML =
            '<tr><td colspan="6">No student records found.</td></tr>';
    }

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        [
            student.roll,
            student.name,
            `${student.total}/500`,
            `${student.percentage.toFixed(2)}%`,
            student.grade
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            students.splice(index, 1);
            displayStudents();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        studentTable.appendChild(row);
    });

    studentCount.textContent = students.length;

    const average = students.length
        ? students.reduce((sum, student) => sum + student.percentage, 0)
            / students.length
        : 0;

    classAverage.textContent = `${average.toFixed(2)}%`;

    if (students.length === 0) {
        topperDisplay.textContent =
            "No student records available yet.";
    } else {
        const topper = students.reduce((best, current) =>
            current.percentage > best.percentage ? current : best
        );

        topperDisplay.textContent =
            `${topper.name} (Roll No. ${topper.roll}) — ` +
            `${topper.percentage.toFixed(2)}%`;
    }
}
