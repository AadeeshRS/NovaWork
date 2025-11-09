const mongoose = require('mongoose');


const payrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee is required']
    },
    month: {
        type: String,
        required: [true, 'Month is required'],
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [2000, 'Year must be 2000 or later'],
        max: [2100, 'Year must be before 2100']
    },
    baseSalary: {
        type: Number,
        required: [true, 'Base salary is required'],
        min: [0, 'Base salary cannot be negative']
    },
    allowances: {
        type: Number,
        default: 0,
        min: [0, 'Allowances cannot be negative']
    },
    bonuses: {
        type: Number,
        default: 0,
        min: [0, 'Bonuses cannot be negative']
    },
    deductions: {
        type: Number,
        default: 0,
        min: [0, 'Deductions cannot be negative']
    },
    tax: {
        type: Number,
        default: 0,
        min: [0, 'Tax cannot be negative']
    },
    netSalary: {
        type: Number,
        required: [true, 'Net salary is required'],
        min: [0, 'Net salary cannot be negative']
    },
    paymentDate: {
        type: Date
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'paid', 'processing'],
            message: '{VALUE} is not a valid payroll status'
        },
        default: 'pending'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Payroll', payrollSchema);
