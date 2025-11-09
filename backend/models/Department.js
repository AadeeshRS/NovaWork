const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    departmentId: {
        type: String,
        required: [true, 'Department ID is required'],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    headOfDepartment: {
        type: String,
        trim: true
    },
    employeeCount: {
        type: Number,
        default: 0,
        min: [0, 'Employee count cannot be negative']
    },
    budget: {
        type: Number,
        min: [0, 'Budget cannot be negative']
    },
    location: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Department', departmentSchema);
