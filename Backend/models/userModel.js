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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
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

    //Trainer specific fields
    specialization: {
        type: String,
        enum: ['yoga', 'weightlifting', 'cardio', 'nutrition', 'rehabilitation'],
       

    },
    experience: {
        type: Number,


    },
    certification: {
        type: String,

    },
    availability: [
        {
            day: String,
            time: String
        }
    ]
    ,
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