import User from "../models/User.js";

// Middleware to check if the user specified by paramsId in res.locals.userAccess is active and exists in the database.
// If the user is active, attaches the user object to res.locals.userAccess, making it dynamically available for each route where this middleware is used.

export const isActive = async (req, res, next) => {
    try {
        const { paramsId } = res.locals.userAccess;

        const user = await User.findById(paramsId).select('-password');
        if (!user) {
            res.locals.errorMessage = 'User not found in the Database';
            return res.status(404).send('User not found');
        }

        if (!user.active) {
            res.locals.errorMessage = 'User has been soft deleted';
            return res.status(404).send('User not found');
        }

        // Attach user to res.locals.userAccess only if active
        res.locals.userAccess.user = user;

        next();
    }
    catch (err) {
        console.error('Error in isActive middleware:', err);
        res.status(500).send('Internal Server Error: backend/middleware/isActive.js');
    }
};