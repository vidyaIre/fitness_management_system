const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    image: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'trainer', 'user'],
        default: 'user',
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    //user specification fields
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    goal: {
        type: String,
        enum: ['weight loss', 'muscle gain', 'maintain weight'],

    },
    memberShip: {
        type: String,
        enum: ['basic', 'premium', 'pro'],

    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },

    //Trainer specific fields
    specialization: {
        type: String,
        enum: ['yoga', 'weightlifting', 'cardio', 'nutrition', 'rehabilitation']
    },
    experience: {
        type: Number
    },
    certification: {
        type: String,
         enum: [
            'ACE',
            'NASM',
            'ISSA',
            'NSCA',
            'ACSM',
            'NESTA',
            'Other'
        ]
    },
    otp:{
        type: String
    },
    otpExpiry:{
        type:Date
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('User', userSchema);