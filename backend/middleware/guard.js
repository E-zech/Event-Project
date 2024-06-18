import jwt from 'jsonwebtoken';
import { getUserFromTKN } from '../configs/config.js';
import { RoleTypes } from '../models/User.js';

export const guard = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.locals.errorMessage = 'No token provided';
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.locals.errorMessage = 'Authentication failed, token is not valid';
                return res.status(401).json({ message: 'Authentication failed. Please provide a valid token' });
            }

            // Check if token needs to be refreshed
            const currentTime = Math.floor(Date.now() / 1000);
            const { exp, userId } = decoded;
            const bufferTime = 300; // 5 minutes buffer time
            if (exp - currentTime <= bufferTime) {
                // Token is about to expire, refresh it
                const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '5h' }); // in production change to '1h' or more
                res.setHeader('Authorization', newToken);
            }

            // Token is valid, proceed to the next middleware
            next();
        });
    } catch (error) {
        // only for Dev convinece i'll show where the error come from, need to delete while production 
        console.error('Error in guard middleware:', error);
        res.status(500).send('Internal Server Error: backend/middleware/guard.js');
    }
};

// export const businessGuard = (req, res, next) => { // if the user from the token is business/admin/master then he can pass the guard.
//     try {
//         const { tokenUserRoleType } = getUserFromTKN(req, res);

//         if (tokenUserRoleType === RoleTypes.business || tokenUserRoleType === RoleTypes.admin || tokenUserRoleType === RoleTypes.master) {
//             next();
//         } else {
//             return res.status(401).send('User not authorized / guard.js > businessGuard');
//         }
//     } catch (error) {
//         console.error('Error in businessGuard middleware:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

export const adminGuard = (req, res, next) => {// if the user from the token is admin then he can pass the guard.
    try {
        const { tokenUserRoleType } = getUserFromTKN(req, res);

        if (tokenUserRoleType === RoleTypes.admin || tokenUserRoleType === RoleTypes.master) {
            next();
        } else {
            res.locals.errorMessage = 'Not authorized, user is not an Admin';
            return res.status(401).send('User not authorized');
        }
    } catch (error) {
        console.error('Error in adminGuard middleware:', error);
        res.status(500).send('Internal Server Error: backend/middleware/guard.js');
    }
};

// export const masterGuard = (req, res, next) => {// if the user from the token is master then he can pass the guard.
//     try {
//         const { tokenUserRoleType } = getUserFromTKN(req, res);

//         if (tokenUserRoleType === RoleTypes.master) {
//             next();
//         } else {
//             res.locals.errorMessage = 'Not authorized, user is not a Master';
//             return res.status(401).send('User not authorized');
//         }
//     } catch (error) {
//         console.error('Error in masterGuard middleware:', error);
//         res.status(500).send('Internal Server Error: backend/middleware/guard.js');
//     }
// };
