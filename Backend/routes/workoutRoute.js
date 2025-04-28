const express = require('express');
const { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const workoutRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

workoutRouter.post('/createWorkout',authMiddleware,roleMiddleware("trainer"), createWorkout);
workoutRouter.get('/getAllWorkouts',authMiddleware,roleMiddleware("trainer", "admin","user"), getAllWorkouts);
workoutRouter.get('/getWorkoutById', authMiddleware, roleMiddleware("trainer", "admin"),getWorkoutById);
workoutRouter.put('/updateWorkout',authMiddleware, roleMiddleware("trainer", "admin"), updateWorkout);
workoutRouter.delete('/deleteWorkout',authMiddleware,roleMiddleware("trainer", "admin"), deleteWorkout);

module.exports = workoutRouter;