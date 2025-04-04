const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    type_of_session: {
        type: String,
        enum: ['personal', 'group'],
        required: true
    },
    feedback: {
        type: String
    }, 
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
module.exports = mongoose.model('Session', sessionSchema);