const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['sick', 'casual', 'annual', 'unpaid', 'maternity', 'paternity']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    approvedBy: {
        type: String,
        default: null
    },
    approvedDate: {
        type: Date,
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Leave', leaveSchema);
