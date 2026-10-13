
let students = [];


/* Show marks section */

function showMarksSection() {

    const studentName = document.getElementById("name").value.trim();
    const rollNumber = document.getElementById("roll").value.trim();

    if (studentName === "" || rollNumber === "") {
        alert("Please enter student name and roll number.");
        return;
    }

    document.getElementById("studentSection").classList.add("hidden");
    document.getElementById("marksSection").classList.remove("hidden");
}


/* Add student */

function addStudent() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();

    const marks = [
        Number(document.getElementById("m1").value),
        Number(document.getElementById("m2").value),
        Number(document.getElementById("m3").value),
        Number(document.getElementById("m4").value),
        Number(document.getElementById("m5").value)
    ];


    // Check marks

    if (marks.some(mark => mark < 0 || mark > 100 || isNaN(mark))) {
        alert("Please enter valid marks between 0 and 100.");
        return;
    }


    // Check duplicate roll number

    if (students.some(student => student.roll === roll)) {
        alert("This roll number already exists.");
        return;
    }


    // Calculate total

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
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }


    // Result

    const result = marks.every(mark => mark >= 35)
        ? "Pass"
        : "Fail";


    const student = {
        name: name,
        roll: roll,
        total: total,
        percentage: percentage,
        grade: grade,
        result: result
    };


    students.push(student);

    displayStudents();
    updateTopper();

    clearMarks();

    document.getElementById("marksSection").classList.add("hidden");
    document.getElementById("studentSection").classList.remove("hidden");
}


/* Display students */

function displayStudents() {

    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.total}</td>
            <td>${student.percentage.toFixed(2)}%</td>
            <td>${student.grade}</td>
            <td>${student.result}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


/* Find topper */

function updateTopper() {

    const topperElement = document.getElementById("topper");

    if (students.length === 0) {
        topperElement.textContent = "Topper : None";
        return;
    }

    const topper = students.reduce((best, current) => {
        return current.percentage > best.percentage
            ? current
            : best;
    });

    topperElement.textContent =
        `Topper : ${topper.name} (${topper.percentage.toFixed(2)}%)`;
}


/* Delete student */

function deleteStudent(index) {

    if (confirm("Do you want to delete this student's result?")) {

        students.splice(index, 1);

        displayStudents();
        updateTopper();
    }
}


/* Clear marks */

function clearMarks() {

    document.getElementById("m1").value = "";
    document.getElementById("m2").value = "";
    document.getElementById("m3").value = "";
    document.getElementById("m4").value = "";
    document.getElementById("m5").value = "";

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
}
