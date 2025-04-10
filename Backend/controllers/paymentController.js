const payment = require('../models/paymentModel');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { user, trainer, session, amount, paymentMethod } = req.body;
    console.log("data received:", req.body);

    try {
        const newPayment = new payment({
            user,
            trainer,
            session,
            amount,
            paymentMethod
        });

        await newPayment.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Payment created successfully",
            payment: newPayment
        });

    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}