const User = require('../models/userModel');
const roleMiddleware = (...roles) => {
    return async (req, res, next) => {
        console.log("request body is ", req.body);
        const userRole = req.user.role;

        console.log("User role is ", userRole)

        if (!roles.includes(userRole)) {
            return res.status(403).json(
                {
                    success: false,
                    statusCode: 403,
                    message: 'access denied, you do not have permission to access this resource',
                    error: 'Forbidden'
                }
            );
        }

        next();
    }
};




        module.exports = roleMiddleware;