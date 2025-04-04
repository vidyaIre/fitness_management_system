const session = require('../models/sessionModel');
const User = require('../models/userModel');
const Workout = require('../models/workoutModel');

exports.createSession = async (req, res) => {
    const { user, trainer, workout, date, time, duration, type_of_session } = req.body;
    console.log("data received:", req.body);

    try {
        const newSession = new session({
            user,
            trainer,
            workout,
            date,
            time,
            duration,
            type_of_session
        });

        await newSession.save();

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Session created successfully",
            session: newSession
        });

    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};