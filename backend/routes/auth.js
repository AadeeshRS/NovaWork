const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

// POST /api/auth/login - Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find employee by email
        const employee = await Employee.findOne({ email: email.toLowerCase() });

        if (!employee) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create session
        req.session.userId = employee._id;
        req.session.employeeId = employee.employeeId;
        req.session.name = employee.name;
        req.session.email = employee.email;
        req.session.role = employee.role || 'employee'; // 'admin' or 'employee'
        req.session.department = employee.department;
        req.session.position = employee.position;

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: employee._id,
                employeeId: employee.employeeId,
                name: employee.name,
                email: employee.email,
                role: employee.role || 'employee',
                department: employee.department,
                position: employee.position
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// POST /api/auth/logout - Logout endpoint
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error logging out'
            });
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
});

// GET /api/auth/check - Check if user is logged in
router.get('/check', (req, res) => {
    if (req.session.userId) {
        res.json({
            success: true,
            loggedIn: true,
            user: {
                id: req.session.userId,
                employeeId: req.session.employeeId,
                name: req.session.name,
                email: req.session.email,
                role: req.session.role,
                department: req.session.department,
                position: req.session.position
            }
        });
    } else {
        res.json({
            success: true,
            loggedIn: false
        });
    }
});

module.exports = router;
