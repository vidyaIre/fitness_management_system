const express = require('express');
const Stripe = require('stripe');
const {createPayment, recordPayment } = require('../controllers/paymentController');
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/createPayment', createPayment);
router.post('/recordPayment', recordPayment);



module.exports = router;