const express = require('express');
const { createNutrition, getAllNutrition , getNutritionByUserId, updateNutritionById, deleteNutritionById} = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createNutrition',authMiddleware, createNutrition);
router.get('/getAllNutrition',authMiddleware, getAllNutrition);
router.get('/getNutritionByUserId',authMiddleware, getNutritionByUserId);
router.put('/updateNutritionById',authMiddleware, updateNutritionById);
router.delete('/deleteNutritionById',authMiddleware, deleteNutritionById);


module.exports = router;
