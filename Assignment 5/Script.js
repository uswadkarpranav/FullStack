
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");
const message = document.getElementById("message");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const employeeId = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const department = document.getElementById("department").value;
    const designation = document.getElementById("designation").value;
    const salary = document.getElementById("salary").value;
    const joiningDate = document.getElementById("joiningDate").value;

    // Check duplicate Employee ID
    const exists = employees.some(
        employee => employee.employeeId === employeeId
    );

    if (exists) {
        showMessage("Employee ID already exists!", "error");
        return;
    }

    // Create employee object
    const employee = {
        employeeId,
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate
    };

    // Add employee
    employees.push(employee);

    // Save in browser
    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    showMessage(
        "Employee registered successfully!",
        "success"
    );

    form.reset();

    displayEmployees();
});


// Display employees
function displayEmployees() {

    table.innerHTML = "";

    employees.forEach(function (employee) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.designation}</td>
            <td>₹${employee.salary}</td>
        `;

        table.appendChild(row);
    });
}


// Show message
function showMessage(text, type) {

    message.textContent = text;
    message.className = type;

    setTimeout(function () {
        message.className = "";
        message.textContent = "";
    }, 3000);
}


// Display saved employees when page loads
displayEmployees();

