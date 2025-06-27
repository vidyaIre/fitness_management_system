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
            clientSecret: paymentIntent.client_secret,
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

        //console.log("Incoming request body:", req.body);

        if (!userId || !amount || !paymentIntentId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: 'Missing required fields',

            });
        }
        const existingPayment = await Payment.findOne({ transactionId: paymentIntentId });
        if(!existingPayment) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Payment not found',
            });
        }
        if(existingPayment.paymentStatus !== 'completed'){
            existingPayment.paymentStatus = 'completed';
            await existingPayment.save();
        }
        await User.findByIdAndUpdate(userId, {
           $set: {paymentStatus: 'paid'}});
           console.log("User payment status updated successfully", existingPayment);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Payment recorded successfully and user updated also',
            paymentId: existingPayment.id
        });
      
    } catch (error) {
        console.error('Record Payment Error:', error);
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


