const workout = require('../models/workoutModel');
const User = require('../models/userModel');

// Create a new workout
exports.createWorkout = async (req, res) => {
    const { title, description, exercises } = req.body;
    //console.log("title:", req.body.title);
    //console.log("description:", req.body.description);
    //console.log("exercises:",req.body.exercises);
    const userId = req.body.userId;
    //console.log("userId:", userId);

    try {
        const newWorkout = new workout({
            UserId: userId,
            title,
            description,
            exercises
        });

        await newWorkout.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Workout created successfully",
            workout: newWorkout
        });
    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};