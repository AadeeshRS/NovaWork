const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate('employee')
            .sort({ date: -1 });
        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance',
            error: error.message
        });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    try {
        const attendance = await Attendance.find({
            employee: req.params.employeeId
        })
            .populate('employee')
            .sort({ date: -1 });
        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance',
            error: error.message
        });
    }
});

router.get('/date-range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const attendance = await Attendance.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
            .populate('employee')
            .sort({ date: -1 });
        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        const savedAttendance = await attendance.save();
        const populatedAttendance = await Attendance.findById(savedAttendance._id)
            .populate('employee');
        res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            data: populatedAttendance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error marking attendance',
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('employee');
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }
        res.json({
            success: true,
            message: 'Attendance updated successfully',
            data: attendance
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating attendance',
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }
        res.json({
            success: true,
            message: 'Attendance deleted successfully',
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting attendance',
            error: error.message
        });
    }
});

module.exports = router;
