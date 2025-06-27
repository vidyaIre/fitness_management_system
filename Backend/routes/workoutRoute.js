const express = require('express');
const { createWorkout,
    getAllWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getAllWorkoutsByUserId
} = require('../controllers/workoutController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/createWorkout', authMiddleware, roleMiddleware("trainer"), createWorkout);
router.get('/getAllWorkouts', authMiddleware, roleMiddleware("trainer", "admin", "user"), getAllWorkouts);
router.get('/getWorkoutById/:id', authMiddleware, roleMiddleware("trainer", "admin", "user"), getWorkoutById);
router.put('/updateWorkout', authMiddleware, roleMiddleware("trainer", "admin"), updateWorkout);
router.delete('/deleteWorkout', authMiddleware, roleMiddleware("trainer", "admin"), deleteWorkout);
router.get('/getAllWorkoutsByUserId/:id', authMiddleware, roleMiddleware("user"), getAllWorkoutsByUserId);

module.exports = router;