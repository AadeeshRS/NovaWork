const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');

router.get('/', async (req, res) => {
    try {
        const payroll = await Payroll.find()
            .populate('employee')
            .sort({ year: -1, month: -1 });
        res.json({
            success: true,
            count: payroll.length,
            data: payroll
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payroll',
            error: error.message
        });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const payroll = await Payroll.find({
            employee: req.params.employeeId
        })
            .populate('employee')
            .sort({ year: -1, month: -1 });
        res.json({
            success: true,
            count: payroll.length,
            data: payroll
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payroll',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id).populate('employee');
        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }
        res.json({
            success: true,
            data: payroll
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payroll',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const payroll = new Payroll(req.body);
        const savedPayroll = await payroll.save();
        const populatedPayroll = await Payroll.findById(savedPayroll._id).populate('employee');
        res.status(201).json({
            success: true,
            message: 'Payroll created successfully',
            data: populatedPayroll
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating payroll',
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('employee');
        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }
        res.json({
            success: true,
            message: 'Payroll updated successfully',
            data: payroll
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating payroll',
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndDelete(req.params.id);
        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }
        res.json({
            success: true,
            message: 'Payroll deleted successfully',
            data: payroll
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting payroll',
            error: error.message
        });
    }
});

module.exports = router;
