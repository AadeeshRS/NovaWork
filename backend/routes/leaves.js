const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('employee')
            .sort({ appliedDate: -1 });
        res.json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leave requests',
            error: error.message
        });
    }
});

// Get leave requests by employee
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const leaves = await Leave.find({
            employee: req.params.employeeId
        })
            .populate('employee')
            .sort({ appliedDate: -1 });
        res.json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leave requests',
            error: error.message
        });
    }
});

// Get leave requests by status
router.get('/status/:status', async (req, res) => {
    try {
        const leaves = await Leave.find({
            status: req.params.status
        })
            .populate('employee')
            .sort({ appliedDate: -1 });
        res.json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leave requests',
            error: error.message
        });
    }
});

// Get single leave request
router.get('/:id', async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id).populate('employee');
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching leave request',
            error: error.message
        });
    }
});

// Create leave request
router.post('/', async (req, res) => {
    try {
        const leave = new Leave(req.body);
        const savedLeave = await leave.save();
        const populatedLeave = await Leave.findById(savedLeave._id).populate('employee');
        res.status(201).json({
            success: true,
            message: 'Leave request submitted successfully',
            data: populatedLeave
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating leave request',
            error: error.message
        });
    }
});

// Update leave request (approve/reject)
router.put('/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('employee');
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.json({
            success: true,
            message: 'Leave request updated successfully',
            data: leave
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating leave request',
            error: error.message
        });
    }
});

// Delete leave request
router.delete('/:id', async (req, res) => {
    try {
        const leave = await Leave.findByIdAndDelete(req.params.id);
        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave request not found'
            });
        }
        res.json({
            success: true,
            message: 'Leave request deleted successfully',
            data: leave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting leave request',
            error: error.message
        });
    }
});

module.exports = router;
