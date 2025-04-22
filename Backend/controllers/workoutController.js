const workout = require('../models/workoutModel');
const User = require('../models/userModel');

// Create a new workout
exports.createWorkout = async (req, res) => {
    const { user, title, description, exercises } = req.body;
    console.log("data is:", req.body);
    //console.log("title:", req.body.title);
    //console.log("description:", req.body.description);
    //console.log("exercises:",req.body.exercises);
    //const userId = req.body.userId;
    //console.log("userId:", userId);

    try {
        const data = await User.findOne({ firstName: user });
        console.log("user is  ", data);
        const newWorkout = new workout({
            user: data._id,
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
// Get all workouts
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await workout.find({ isActive: true, isDeleted: false }).populate('user', 'name email');
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: workouts.length,
            message: "Workouts fetched successfully",
            workouts
        });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Get a single workout by ID
exports.getWorkoutById = async (req, res) => {
    const { id } = req.body;
    console.log("id:", id);

    try {
        const workoutData = await workout.findById(id).populate('user', 'name email');

        if (!workoutData) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Workout fetched successfully",
            workout: workoutData
        });
    } catch (error) {
        console.error("Error fetching workout:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Update a workout
exports.updateWorkout = async (req, res) => {
    const {id, title, description, exercises } = req.body;
    console.log("id:", id);
    console.log("title:", title);
    console.log("description:", description);
    console.log("exercises:", exercises);

    try {
        const updatedWorkout = await workout.findByIdAndUpdate(
           id,
            { title, description, exercises },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Workout updated successfully",
            workout: updatedWorkout
        });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
};
// Delete a workout
exports.deleteWorkout = async (req, res) => {
    const { id } = req.body;
    console.log("id:", id);

    try {
        const deletedWorkout = await workout.findByIdAndUpdate(
            id,
            { isActive: false, isDeleted: true },
            { new: true }
        );

        if (!deletedWorkout) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Workout not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Workout deleted successfully",
            workout: deletedWorkout
        });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Server error"
        });
    }
}