import User, { RoleTypes } from '../../models/User.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { UserValidationWithoutPassword } from '../../validation/userJoi.js'; // Ensure this path is correct
import { guard } from '../../middleware/guard.js';
import { isActive } from '../../middleware/isActive.js';

const editUser = app => {
    app.put('/user/:id', guard, authorizeUser, isActive, async (req, res) => {
        try {
            const { user } = res.locals.userAccess;
            // Validate the req.body using Joi 
            const { error, value } = UserValidationWithoutPassword.validate(req.body, { abortEarly: false });

            if (error) {
                // If validation failed, extract the error messages and send them
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                res.locals.errorMessage = `\n${errorObj.join(', \n')}`;
                return res.status(400).send(errorObj);
            }

            // Proceed with updating user details
            value.roleType = user.roleType;
            user.set(value);
            await user.save();
            res.send(user);
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/users/editUser.js';
            // For development convenience; remove in production
            return res.status(500).send('Internal Server Error: backend/handlers/user/editUser.js');
        }
    });
}

export default editUser;
