const express = require('express');
const { createStripeSession, stripeWebhook } = require('../controllers/stripeController');
const  router = express.Router();

router.post('/createStripeSession', createStripeSession);
router.post('/stripeWebhook ', express.raw({type: 'application/json'}),stripeWebhook);

module.exports = router;