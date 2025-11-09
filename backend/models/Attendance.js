const mongoose = require('mongoose');


const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    status: {
        type: String,
        required: [true, 'Attendance status is required'],
        enum: {
            values: ['present', 'absent', 'late', 'half-day', 'leave'],
            message: '{VALUE} is not a valid attendance status'
        }
    },
    checkIn: {
        type: String,
        trim: true
    },
    checkOut: {
        type: String,
        trim: true
    },
    workingHours: {
        type: Number,
        min: [0, 'Working hours cannot be negative'],
        max: [24, 'Working hours cannot exceed 24']
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});


attendanceSchema.index({ employee: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
