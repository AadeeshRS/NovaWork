const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { isAuthenticated, isEmployee } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// GET /api/employees/me - Get current logged-in employee's data
router.get('/me', isAuthenticated, isEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.session.userId).select('-password');
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employee data',
            error: error.message
        });
    }
});

// PUT /api/employees/me - Update current logged-in employee's profile
router.put('/me', isAuthenticated, isEmployee, async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const employee = await Employee.findById(req.session.userId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Update fields
        if (name) employee.name = name;
        if (email) employee.email = email;
        if (phone) employee.phone = phone;
        if (address) employee.address = address;

        await employee.save();

        // Update session data
        req.session.name = employee.name;
        req.session.email = employee.email;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// POST /api/employees/change-password - Change password for logged-in employee
router.post('/change-password', isAuthenticated, isEmployee, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both current and new password'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        const employee = await Employee.findById(req.session.userId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, employee.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password (will be hashed by pre-save hook)
        employee.password = newPassword;
        await employee.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employees',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employee',
            error: error.message
        });
    }
});

router.get('/department/:dept', async (req, res) => {
    try {
        const employees = await Employee.find({ department: req.params.dept });
        res.json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employees',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: savedEmployee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating employee',
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: employee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating employee',
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        res.json({
            success: true,
            message: 'Employee deleted successfully',
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting employee',
            error: error.message
        });
    }
});

module.exports = router;
