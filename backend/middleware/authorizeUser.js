import mongoose from 'mongoose';
import { getUserFromTKN } from '../configs/config.js';
import { RoleTypes } from '../models/User.js';

// Middleware to authorize a user based on the provided token and request parameters.
// Saves authorization details in res.locals.userAccess, making them dynamically available for each route where this middleware is used.
export const authorizeUser = async (req, res, next) => {
    try {
        const paramsId = req.params.id; // the id of the user that needs to be accessed
        const { tokenUserId, tokenUserRoleType } = getUserFromTKN(req, res); // extract user info from token

        // Check if the user from the token is an admin or master - (boolean) true or false state.
        const isAdminOrMaster = [RoleTypes.admin, RoleTypes.master].includes(tokenUserRoleType);

        // Check if paramsId is not a valid mongoose id
        if (!mongoose.Types.ObjectId.isValid(paramsId)) {
            res.locals.errorMessage = 'Invalid user ID in the URL params';
            return res.status(400).send('Invalid user ID in the URL params');
        }

        // Check if the user is authorized
        if (tokenUserId !== paramsId && !isAdminOrMaster) {
            res.locals.errorMessage = 'Not authorized';
            return res.status(401).send('Not authorized');
        }

        // Dynamically attach userId and isAdminOrMaster to locals for later use
        res.locals.userAccess = {
            paramsId, // the Id of the user from the URL params
            tokenUserId, // the Id of the user from the token
            tokenUserRoleType, // can be 1 of the following: none, business, admin, or master
            isAdminOrMaster // true or false
        };

        next();
    }
    catch (err) {
        // only for Dev convinece i'll show where the error come from, need to delete while production 
        console.error('Error in authorizeUser middleware:', err);
        res.status(500).send('Internal Server Error: backend/middleware/authorizeUser.js');
    }
};
