const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware= async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        //console.log(" token:", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, no token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log("decoded:", decoded);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, invalid token'
            });
        }
        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
        if (!user) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized, user not found'
            });
        }
        //console.log(next);
        next();
    } catch (error) {   
        console.error('Error in authMiddleware:', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized, invalid token'
        });
    }

};
module.exports = authMiddleware;