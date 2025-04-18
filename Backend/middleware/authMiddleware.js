const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, no token provided or invalid format'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, token missing'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            console.error('JWT verification error:', err.message);
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, invalid token'
            });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, user not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = authMiddleware;