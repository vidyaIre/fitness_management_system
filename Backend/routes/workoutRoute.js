const express = require('express');
const { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/createWorkout',authMiddleware,roleMiddleware("trainer"), createWorkout);
router.get('/getAllWorkouts',authMiddleware,roleMiddleware("trainer", "admin"), getAllWorkouts);
router.get('/getWorkoutById', authMiddleware, roleMiddleware("trainer", "admin"),getWorkoutById);
router.put('/updateWorkout',authMiddleware, roleMiddleware("trainer", "admin"), updateWorkout);
router.delete('/deleteWorkout',authMiddleware,roleMiddleware("trainer", "admin"), deleteWorkout);

module.exports = router;