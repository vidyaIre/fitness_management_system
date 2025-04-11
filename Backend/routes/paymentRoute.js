const express = require('express');
const { createPayment, getAllPayments, getPaymentById,updatePaymentStatus, deletePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/createPayment', createPayment);
router.get('/getAllPayments', getAllPayments);
router.get('/getPaymentById', getPaymentById);
router.put('/updatePaymentStatus', updatePaymentStatus);
router.delete('/deletePayment', deletePayment);


module.exports = router;