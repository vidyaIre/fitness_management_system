const express = require('express');
const { createNutrition } = require('../controllers/nutritionController');
const router = express.Router();

router.post('/createNutrition', createNutrition);

module.exports = router;
