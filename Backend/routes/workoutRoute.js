const express = require('express');
const { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout } = require('../controllers/workoutController');
const router = express.Router();

router.post('/createWorkout', createWorkout);
router.get('/getAllWorkouts', getAllWorkouts);
router.get('/getWorkoutById', getWorkoutById);
router.put('/updateWorkout', updateWorkout);

module.exports = router;