const express = require('express');
const { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createWorkout',authMiddleware, createWorkout);
router.get('/getAllWorkouts',authMiddleware, getAllWorkouts);
router.get('/getWorkoutById', authMiddleware,getWorkoutById);
router.put('/updateWorkout',authMiddleware, updateWorkout);
router.delete('/deleteWorkout',authMiddleware, deleteWorkout);

module.exports = router;