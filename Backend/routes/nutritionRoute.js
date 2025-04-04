const express = require('express');
const { createNutrition, getAllNutrition , getNutritionByUserId, updateNutritionById} = require('../controllers/nutritionController');
const router = express.Router();

router.post('/createNutrition', createNutrition);
router.get('/getAllNutrition', getAllNutrition);
router.get('/getNutritionByUserId', getNutritionByUserId);
router.put('/updateNutritionById', updateNutritionById);



module.exports = router;
