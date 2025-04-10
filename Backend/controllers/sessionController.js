const session = require('../models/sessionModel');
const User = require('../models/userModel');
const Workout = require('../models/workoutModel');

// Create a new session
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
// Get all sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await session.find().populate('user trainer workout');
        res.status(200).json({
            success: true,
            statusCode: 200,
            count: sessions.length,
            message: "Sessions retrieved successfully",
            sessions
        });
    } catch (error) {
        console.error("Error retrieving sessions:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
// Get a single session by ID
exports.getSessionById = async (req, res) => {
    const { id } = req.body;
    console.log("session id:", id);
   
    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Session ID is required"
            });
        }
        const sessionData = await session.findById(id).populate('user trainer workout');
        if (!sessionData) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Session not found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Session retrieved successfully",
            session: sessionData
        });
    } catch (error) {
        console.error("Error retrieving session:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
// Update a session
exports.updateSession = async (req, res) => {
    const { id, user, trainer, workout, date, time, duration, type_of_session } = req.body;
    console.log("data received:", req.body);

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Session ID is required"
            });
        }
        const updatedSession = await session.findByIdAndUpdate(id, {
            user,
            trainer,
            workout,
            date,
            time,
            duration,
            type_of_session
        }, { new: true });

        if (!updatedSession) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Session updated successfully",
            session: updatedSession
        });

    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
};
// Delete a session
exports.deleteSession = async (req, res) => {
    const { id } = req.body;
    console.log("session id:", id);

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Session ID is required"
            });
        }
        const deletedSession = await session.findByIdAndDelete(id);
        if (!deletedSession) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Session not found"
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Session deleted successfully",
            session: deletedSession
        });

    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}
