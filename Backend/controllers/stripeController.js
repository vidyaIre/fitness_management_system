const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentModel');

exports.createStripeSession = async (req, res) => {
    try {
        const { amount, userId, userEmail } = req.body;
        console.log("data received:", req.body);
        // Create a new Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Fitness Management System Subscription',
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: userEmail,
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });
        await Payment.create({
            user: userId,
            amount,
            paymentMethod: 'credit_card',
            status: 'pending',
            transactionId: session.id
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Stripe session created successfully",
            sessionId: session.id,
        })
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
//webhook to update payment status
exports.stripeWebhook = async (req, res) => {
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endPointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if(event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;
        const payment = await Payment.findOne({ transactionId: paymentIntentId });
        if(payment) {
            payment.status = 'completed';
            await payment.save();
            console.log("Payment status updated to completed");
        }
    }
    res.status(200).json({ 
        received: true,
        statusCode: 200,
        message: "Webhook received successfully"
     });

}
