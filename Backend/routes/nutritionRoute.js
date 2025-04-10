const express = require('express');
const { createNutrition, getAllNutrition, getNutritionByUserId, updateNutritionById, deleteNutritionById } = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/createNutrition', authMiddleware, roleMiddleware("trainer"), createNutrition);
router.get('/getAllNutrition', authMiddleware, roleMiddleware("trainer", "admin"), getAllNutrition);
router.get('/getNutritionByUserId', authMiddleware, roleMiddleware("trainer", "admin"), getNutritionByUserId);
router.put('/updateNutritionById', authMiddleware, roleMiddleware("trainer", "admin", "user"), updateNutritionById);
router.delete('/deleteNutritionById', authMiddleware, roleMiddleware("trainer", "admin"), deleteNutritionById);


module.exports = router;
