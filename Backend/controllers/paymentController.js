const payment = require('../models/paymentModel');

// Create a new payment
exports.createPayment = async (req, res) => {
    const { user, amount, paymentMethod } = req.body;
    console.log("data received:", req.body);

    try {
        const newPayment = new payment({
            user,
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
};
// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await payment.find().populate('user', 'name email');
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: payments.length,
            message: "Payments retrieved successfully",
            data:payments
        });
    } catch (error) {
        console.error("Error retrieving payments:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
    const { id } = req.body;
    console.log("id received:", id);
    try {
        const paymentData = await payment.findById(id);
        if (!paymentData) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Payment not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Payment retrieved successfully",
            payment: paymentData
        });

    }catch (error) {
        console.error("Error retrieving payment:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
        
};
// Update a payment status
exports.updatePaymentStatus = async (req, res) => {
    const { id, status } = req.body;
    console.log("data received:", req.body);
    try {
        const updatedPayment = await payment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedPayment) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Payment not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Payment status updated successfully",
            payment: updatedPayment
        });

    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
//delete a payment by soft delete
exports.deletePayment = async (req, res) => {
    const { id } = req.body;
    console.log("id received:", id);
    try {
        const deletedPayment = await payment.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (!deletedPayment) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Payment not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Payment deleted successfully",
            payment: deletedPayment
        });

    } catch (error) {
        console.error("Error deleting payment:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}