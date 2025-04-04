const roleMiddleware = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is populated with user data

        if (!role.includes(userRole)) {
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
    };
};
module.exports = roleMiddleware;