# NovaWork - Evaluation 2 Implementation Guide

## Overview
This document explains how JavaScript OOP concepts and JSON have been implemented in the NovaWork Employee Salary Management System for your second evaluation.

---

## 📋 Implementation Summary

### 1. JavaScript OOP Implementation
**Page:** `employee-dashboard.html`
**Concept:** Object-Oriented Programming using Classes

### 2. JSON Implementation #1
**Page:** `admin-departments.html`
**File:** `json/departments.json`
**Concept:** Fetching and displaying department data from JSON

### 3. JSON Implementation #2
**Page:** `admin-employees.html`
**File:** `json/employees.json`
**Concept:** Fetching and displaying employee data from JSON

---

## 🎯 Part 1: JavaScript OOP Concepts (employee-dashboard.html)

### What is OOP?
Object-Oriented Programming (OOP) is a programming paradigm that uses "objects" and "classes" to organize code. It's like creating a blueprint (class) and then making actual items (objects) from that blueprint.

### How It Works in Your Reference Code

In your class reference, you had a `Student` class:

```javascript
class Student {
    static roll = 0  // Static property - shared by all students
    
    constructor(name, m1, m2, m3) {  // Constructor - runs when creating new student
        this.roll = ++Student.roll
        this.name = name
        this.m1 = m1
        this.m2 = m2
        this.m3 = m3
    }

    disp() {  // Method to display student info
        console.log("Roll:"+ this.roll+", Name:"+this.name)
    }

    result() {  // Method to calculate result
        let per = (this.m1+this.m2+this.m3)/3
        if(per>40)
            console.log("Result:Pass")
    }
}

// Creating objects
let ob = new Student("Amit", 10,10,20)
let ob1 = new Student("Amita", 40,40,40)

// Using objects
ob.disp()
ob.result()
```

### How It's Implemented in NovaWork

In your `employee-dashboard.html`, we created an `Employee` class:

```javascript
class Employee {
    static employeeCount = 0;  // Static property - tracks total employees

    constructor(name, id, department, designation, salary, joiningDate) {
        this.name = name;
        this.id = id;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
        this.joiningDate = new Date(joiningDate);
        this.presentDays = 22;
        this.annualLeave = 18;
        this.sickLeave = 8;
        this.casualLeave = 5;
        Employee.employeeCount++;  // Increment each time new employee is created
    }

    // Method to calculate years of service
    calculateYearsOfService() {
        const today = new Date();
        const years = today.getFullYear() - this.joiningDate.getFullYear();
        return years;
    }

    // Method to calculate performance
    calculatePerformance() {
        const attendanceRate = (this.presentDays / 22) * 100;
        return Math.round(attendanceRate);
    }

    // Method to get total leaves
    getTotalLeaves() {
        return this.annualLeave + this.sickLeave + this.casualLeave;
    }

    // Method to display stats on webpage
    displayStats() {
        const statsSection = document.getElementById('statsSection');
        statsSection.innerHTML = `...HTML code with employee data...`;
    }

    // Method to display leave balance
    displayLeaveBalance() {
        const leaveSection = document.getElementById('leaveSection');
        leaveSection.innerHTML = `...HTML code with leave data...`;
    }

    // Main method to display entire dashboard
    displayDashboard() {
        this.displayStats();
        this.displayLeaveBalance();
        console.log("Employee Dashboard Details");
        console.log(`Name: ${this.name}`);
        console.log(`Performance: ${this.calculatePerformance()}%`);
    }
}

// Creating employee object (like: let ob = new Student(...))
let currentEmployee = new Employee(
    "Rahul Sharma",
    "EMP001",
    "Information Technology",
    "Senior Software Engineer",
    80000,
    "2020-03-15"
);

// Using the object to display dashboard
currentEmployee.displayDashboard();

// Static property usage
console.log(`Total Employees: ${Employee.employeeCount}`);
```

### Key OOP Concepts Used:

1. **Class**: `Employee` - The blueprint for creating employee objects
2. **Constructor**: `constructor(name, id, ...)` - Initializes object properties when created
3. **Static Property**: `employeeCount` - Shared across all Employee objects
4. **Properties**: `this.name`, `this.salary`, `this.presentDays` - Data stored in each object
5. **Methods**: `calculateYearsOfService()`, `displayStats()` - Functions that work with object data
6. **Object Creation**: `new Employee(...)` - Creates actual employee object from class
7. **`this` keyword**: Refers to the current object instance

### Comparison with Reference Code:

| Reference (Student) | NovaWork (Employee) |
|-------------------|---------------------|
| `static roll = 0` | `static employeeCount = 0` |
| `constructor(name, m1, m2, m3)` | `constructor(name, id, department, ...)` |
| `disp()` method | `displayStats()` method |
| `result()` method | `calculatePerformance()` method |
| `let ob = new Student(...)` | `let currentEmployee = new Employee(...)` |
| `ob.disp()` | `currentEmployee.displayDashboard()` |

---

## 📊 Part 2: JSON Implementation (admin-departments.html & admin-employees.html)

### What is JSON?
JSON (JavaScript Object Notation) is a format for storing and transporting data. It's like a structured way to organize information in key-value pairs.

### JSON File Structure

**departments.json:**
```json
{
    "companyName": "NovaWork",
    "totalDepartments": 6,
    "departments": [
        {
            "deptId": "DEPT001",
            "deptName": "Information Technology",
            "deptIcon": "💻",
            "employees": 45,
            "avgSalary": 65000,
            "projects": 12,
            "budget": 5000000,
            "head": "Amit Kumar"
        },
        {
            "deptId": "DEPT002",
            "deptName": "Finance",
            ...
        }
    ]
}
```

### How JSON Works in Your Reference Code

```javascript
// 1. Create request to JSON file
let request = new Request("json/bmu.json");

// 2. Fetch the data (async - waits for file to load)
let response = await fetch(request);

// 3. Convert response to JavaScript object
let jsonobj = await response.json();

// 4. Access data
let branches = jsonobj["branches"];

// 5. Loop through array
for(let branch of branches) {
    console.log(branch.bname);  // Access branch name
    
    // Create HTML elements
    let bname1 = document.createElement("h2");
    bname1.textContent = branch.bname;
    article.appendChild(bname1);
    
    // Access array within object
    let elecs = branch.elec;
    for (let elective of elecs) {
        let li = document.createElement("li");
        li.textContent = elective;
        ul.appendChild(li);
    }
}
```

### How It's Implemented in NovaWork

**admin-departments.html:**

```javascript
// Main function to update page from JSON
async function updateDepartmentsPage() {
    // Step 1: Create request object
    let request = new Request("json/departments.json");
    
    // Step 2: Fetch the data (async operation)
    let response = await fetch(request);
    
    // Step 3: Convert to JSON object
    let jsonobj = await response.json();
    
    // Step 4: Verify data loaded
    console.log("Loaded JSON Data:", JSON.stringify(jsonobj));

    // Step 5: Call functions to update page
    updateHeader(jsonobj);
    updateDepartmentCards(jsonobj);
    updateDepartmentTable(jsonobj);
}

// Function to update header
function updateHeader(jsonobj) {
    let headerSection = document.getElementById("headerSection");
    let totalDepts = jsonobj.totalDepartments;  // Access property
    
    headerSection.innerHTML = `
        <div class="container">
            <h1>Department Management</h1>
            <p>Total: ${totalDepts}</p>
        </div>
    `;
}

// Function to create department cards
function updateDepartmentCards(jsonobj) {
    let departmentsGrid = document.getElementById("departmentsGrid");
    departmentsGrid.innerHTML = '';
    
    // Get departments array
    let departments = jsonobj.departments;
    
    // Loop through each department (like: for(let branch of branches))
    for (let dept of departments) {
        // Create card element
        let deptCard = document.createElement("div");
        deptCard.className = "dept-card";
        
        // Set HTML content with dept data
        deptCard.innerHTML = `
            <div class="dept-icon">${dept.deptIcon}</div>
            <div class="dept-name">${dept.deptName}</div>
            <div class="dept-head">${dept.head}</div>
            <div class="dept-stats">
                <div class="dept-stat">
                    <div class="dept-stat-number">${dept.employees}</div>
                    <div class="dept-stat-label">Employees</div>
                </div>
                <div class="dept-stat">
                    <div class="dept-stat-number">₹${dept.avgSalary.toLocaleString()}</div>
                    <div class="dept-stat-label">Avg Salary</div>
                </div>
                <div class="dept-stat">
                    <div class="dept-stat-number">${dept.projects}</div>
                    <div class="dept-stat-label">Projects</div>
                </div>
            </div>
        `;
        
        // Add card to grid
        departmentsGrid.appendChild(deptCard);
    }
}

// Function to populate table
function updateDepartmentTable(jsonobj) {
    let tableBody = document.getElementById("departmentsTable");
    tableBody.innerHTML = '';
    
    let departments = jsonobj.departments;
    
    for (let dept of departments) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${dept.deptId}</td>
            <td>${dept.deptName}</td>
            <td>${dept.head}</td>
            <td>${dept.employees}</td>
            <td>₹${dept.avgSalary.toLocaleString()}</td>
            <td>₹${dept.budget.toLocaleString()}</td>
            <td><button>View Details</button></td>
        `;
        tableBody.appendChild(row);
    }
}

// Call main function
updateDepartmentsPage();
```

**admin-employees.html:**

Similar structure but for employees data:

```javascript
async function updateEmployeesPage() {
    let request = new Request("json/employees.json");
    let response = await fetch(request);
    let jsonobj = await response.json();
    
    updateEmployeeTable(jsonobj);
}

function updateEmployeeTable(jsonobj) {
    let tableBody = document.getElementById("employeesTable");
    let employees = jsonobj.employees;
    
    for (let emp of employees) {
        // Create initials for avatar
        let nameParts = emp.name.split(' ');
        let initials = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '');
        
        // Format salary
        let formattedSalary = emp.salary.toLocaleString();
        
        // Create row
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="employee-info">
                    <div class="employee-avatar">${initials}</div>
                    <div class="employee-details">
                        <div class="employee-name">${emp.name}</div>
                        <div class="employee-id">${emp.id}</div>
                    </div>
                </div>
            </td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td>₹${formattedSalary}</td>
            <td>${formattedDate}</td>
            <td><span class="status-badge">${emp.status}</span></td>
            <td>...</td>
        `;
        tableBody.appendChild(row);
    }
}

updateEmployeesPage();
```

### Comparison with Reference Code:

| Reference (BMU) | NovaWork (Departments) | NovaWork (Employees) |
|----------------|------------------------|----------------------|
| `"json/bmu.json"` | `"json/departments.json"` | `"json/employees.json"` |
| `jsonobj["branches"]` | `jsonobj.departments` | `jsonobj.employees` |
| `for(let branch of branches)` | `for(let dept of departments)` | `for(let emp of employees)` |
| `branch.bname` | `dept.deptName` | `emp.name` |
| `branch.elec` (array) | `dept.employees` (number) | `emp.salary` (number) |
| Updates header & section | Updates cards & table | Updates table |

---

## 🔑 Key Concepts Explained

### 1. Async/Await
```javascript
async function updatePage() {
    let response = await fetch(request);  // Wait for file to load
    let jsonobj = await response.json();  // Wait for conversion
}
```
- `async`: Marks function as asynchronous
- `await`: Waits for operation to complete before continuing

### 2. DOM Manipulation
```javascript
let element = document.getElementById("myId");  // Get element
element.innerHTML = "new content";  // Change content
let newDiv = document.createElement("div");  // Create element
parent.appendChild(newDiv);  // Add to page
```

### 3. Template Literals
```javascript
let name = "Rahul";
let text = `Hello ${name}!`;  // Hello Rahul!
let html = `<div>${dept.deptName}</div>`;  // Embed variables in HTML
```

### 4. Array Iteration
```javascript
let arr = [1, 2, 3];
for(let item of arr) {  // Loop through array
    console.log(item);
}
```

### 5. Object Property Access
```javascript
let obj = {name: "Rahul", age: 25};
console.log(obj.name);     // Dot notation
console.log(obj["name"]);  // Bracket notation
```

---

## 📁 File Structure

```
NovaWork/
├── json/
│   ├── departments.json     (Department data)
│   └── employees.json       (Employee data)
├── admin-departments.html   (JSON Implementation #1)
├── admin-employees.html     (JSON Implementation #2)
├── employee-dashboard.html  (OOP Implementation)
└── EVALUATION_EXPLANATION.md (This file)
```

---

## 🎓 How to Explain This in Your Evaluation

### For OOP (employee-dashboard.html):

1. **Show the class definition**: Point out the Employee class
2. **Explain constructor**: How it initializes employee properties
3. **Demonstrate methods**: Show calculatePerformance(), displayStats()
4. **Show object creation**: `new Employee(...)`
5. **Explain static property**: `Employee.employeeCount`
6. **Show usage**: How object methods update the webpage

### For JSON (admin-departments.html):

1. **Show JSON file**: Display the departments.json structure
2. **Explain async function**: How it fetches data
3. **Show data access**: How to access jsonobj.departments
4. **Demonstrate loop**: for(let dept of departments)
5. **Show DOM update**: How createElement and appendChild work
6. **Display result**: The populated cards and table

### For JSON (admin-employees.html):

1. **Show JSON file**: Display employees.json
2. **Explain similar pattern**: Like departments but for employees
3. **Show extra processing**: Initials creation, date formatting
4. **Demonstrate table population**: How rows are created dynamically

---

## 🚀 Testing Your Implementation

1. **Open employee-dashboard.html**
   - Check browser console (F12) - should see employee details
   - Verify stats are showing with correct values
   - Confirm leave balance is displayed

2. **Open admin-departments.html**
   - Check console - should see "Loaded JSON Data"
   - Verify 6 department cards appear
   - Check table has 6 rows with correct data

3. **Open admin-employees.html**
   - Check console - should see "Loaded Employees JSON"
   - Verify employee table has 8 rows
   - Confirm initials, names, salaries are correct

---

## 💡 Common Questions & Answers

**Q: What's the difference between a class and an object?**
A: A class is a blueprint (like a cookie cutter), an object is an instance (like an actual cookie).

**Q: Why use static properties?**
A: Static properties are shared across all objects of a class, useful for counters or shared data.

**Q: What does `this` mean?**
A: `this` refers to the current object instance inside a class method.

**Q: Why use async/await for JSON?**
A: Fetching files takes time, async/await ensures code waits for data before using it.

**Q: Can I modify the JSON data?**
A: Yes! Just edit the .json files with your own data, the JavaScript will automatically use it.

---

## 📝 Summary

✅ **OOP Implementation**: Employee class with constructor, methods, static property, and object creation
✅ **JSON Implementation #1**: Departments page fetching and displaying data from JSON
✅ **JSON Implementation #2**: Employees page fetching and displaying data from JSON
✅ **Follows Reference**: Pattern matches your class reference code
✅ **Working Pages**: All three pages are functional and ready for evaluation

Good luck with your evaluation! 🎉
