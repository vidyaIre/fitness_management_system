const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const {
            userId,
            amount,
            paymentMethod
        } = req.body;
        console.log("user is:", userId);
        console.log("amount is:", amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: 'inr',
            metadata: {
                integration_check: 'accept_a_payment',
                userId: userId,
                paymentMethod: paymentMethod
            }
        });
        console.log("Payment Intent created:", paymentIntent);
        const payment = new Payment({
            user: userId,
            amount: amount,
            paymentMethod: paymentMethod,
            transactionId: paymentIntent.id,
            paymentStatus: 'pending'
        });
        const savedPayment = await payment.save();
        console.log("Payment saved successfully:", savedPayment);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            clientSecret: payment.client_secret,
            paymentId: payment.id,
            message: 'Payment created successfully',
        });

    } catch (error) {
        console.error('Create Payment Error:', error);
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.recordPayment = async (req, res) => {
    try {
        const {
            userId,
            amount,
            paymentIntentId
        } = req.body;

        console.log("Incoming request body:", req.body);

        if (!userId || !amount || !paymentIntentId) {
            return res.status(400).json({ 
            statusCode: 400,
            success: false,
            message: 'Missing required fields',
            
         });
        }
        const existingPayment = await Payment.findOne({ transactionId: paymentIntentId });
        if (existingPayment) {
            if (existingPayment.paymentStatus === 'completed') {
                return res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: 'Payment already recorded',
                    payment: existingPayment
                });
            }
            existingPayment.paymentStatus = 'completed';
            const updatedPayment = await existingPayment.save();
            console.log("Payment updated successfully:", updatedPayment);
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: 'Payment updated successfully',
                payment: updatedPayment
            });
        }
        const newPayment = new Payment({
            user: userId,
            amount,
            paymentMethod: 'stripe',
            transactionId: paymentIntentId,
            paymentStatus: 'completed'
        });

        const savedPayment = await newPayment.save();
        console.log("Payment saved successfully:", savedPayment);

        res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Payment recorded successfully',
            payment: savedPayment
        });
    } catch (err) {
        console.error('Error recording payment:', err);
        res.status(500).json({
            statusCode: 500,
            success: false,
            error: 'Failed to record payment',
            details: err.message
        });
    }

};

