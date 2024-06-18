import User, { RoleTypes } from '../../models/User.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { UserValidationWithoutPassword } from '../../validation/userJoi.js'; // Ensure this path is correct
import { guard } from '../../middleware/guard.js';

const editUser = app => {
    app.put('/user/:id', guard, authorizeUser, async (req, res) => {
        try {
            const { paramsId } = res.locals.userAccess;

            // validate the req.body using Joi 
            const { error, value } = UserValidationWithoutPassword.validate(req.body, { abortEarly: false });

            if (error) {
                // if the validation failed extarct the message from the err and log it
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                // Store the custom error message
                res.locals.errorMessage = `\n${errorObj.join(', \n')}`;
                // Send the custom error message
                return res.status(400).send(errorObj);
            }

            const updateUser = await User.findById(paramsId);
            if (!updateUser) {
                res.locals.errorMessage = 'User not found in the Database';
                return res.status(404).send('User not found');
            }

            value.roleType = updateUser.roleType;

            updateUser.set(value);
            await updateUser.save();

            const user = {
                ...updateUser.toObject(),
                password: undefined,
            };

            res.send(user);

        }
        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default editUser; 
