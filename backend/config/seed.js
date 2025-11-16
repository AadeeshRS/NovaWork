const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/novawork', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        console.log('Starting data seeding...\n');

        const employeesData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../../frontend/json/employees.json'), 'utf8')
        );

        const departmentsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../../frontend/json/departments.json'), 'utf8')
        );

        await Employee.deleteMany({});
        console.log('Cleared existing employees');

        await Department.deleteMany({});
        console.log('Cleared existing departments\n');

        const departments = departmentsData.departments.map(dept => ({
            departmentId: dept.deptId,
            name: dept.deptName,
            description: `${dept.deptName} department`,
            headOfDepartment: dept.head,
            employeeCount: dept.employees,
            budget: dept.budget,
            location: 'Main Office'
        }));

        const insertedDepartments = await Department.insertMany(departments);
        console.log(`Inserted ${insertedDepartments.length} departments`);

        const employees = employeesData.employees.map(emp => ({
            employeeId: emp.id,
            name: emp.name,
            email: `${emp.id.toLowerCase()}@novawork.com`,
            password: 'password123',
            role: 'employee', // Default role
            department: emp.department,
            position: emp.designation,
            salary: emp.salary,
            joinDate: new Date(emp.joiningDate),
            phone: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            address: 'Gurugram, Haryana',
            status: emp.status
        }));

        
        const adminUser = {
            employeeId: 'ADMIN001',
            name: 'Admin User',
            email: 'admin@novawork.com',
            password: 'admin123',
            role: 'admin',
            department: 'Management',
            position: 'System Administrator',
            salary: 1500000,
            joinDate: new Date('2024-01-01'),
            phone: '+91 9876543210',
            address: 'Gurugram, Haryana',
            status: 'Active'
        };

        employees.push(adminUser);

        
        const insertedEmployees = [];
        for (const empData of employees) {
            const employee = new Employee(empData);
            const saved = await employee.save();
            insertedEmployees.push(saved);
        }

        console.log(`Inserted ${insertedEmployees.length} employees (including 1 admin)\n`);

        console.log('Data seeding completed successfully!');
        console.log('\nSummary:');
        console.log(`   Departments: ${insertedDepartments.length}`);
        console.log(`   Employees: ${insertedEmployees.length}`);
        console.log('\nLogin Credentials:');
        console.log('   Admin:');
        console.log('      Email: admin@novawork.com');
        console.log('      Password: admin123');
        console.log('   Employee (example):');
        console.log('      Email: emp001@novawork.com');
        console.log('      Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

connectDB().then(() => seedData());
