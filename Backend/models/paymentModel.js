const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card','upi', 'debit_card','stripe'],
        required: true
    },
    cardNumber: {
        type: String,
        required: function() {
            return this.paymentMethod === 'credit_card' || this.paymentMethod === 'debit_card';
        }
    },
    cardHolderName: {
        type: String,
        required: function() {
            return this.paymentMethod === 'credit_card' || this.paymentMethod === 'debit_card';
        }
    },
    expiryDate: {
        type: String,
        required: function() {
            return this.paymentMethod === 'credit_card' || this.paymentMethod === 'debit_card';
        }
    },
    upiId: {
        type: String,
        required: function() {
            return this.paymentMethod === 'upi';
        }
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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

module.exports = mongoose.model('Payment', paymentSchema);