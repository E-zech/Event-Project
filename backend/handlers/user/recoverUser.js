import User, { RoleTypes } from '../../models/User.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { adminGuard, guard } from '../../middleware/guard.js';
import { isActive } from '../../middleware/isActive.js';

const recoverUser = app => {
    app.patch('/user/recover/:id', guard, adminGuard, authorizeUser, async (req, res) => {
        try {
            const { paramsId } = res.locals.userAccess;

            const user = await User.findById(paramsId).select('-password');

            if (!user) {
                res.locals.errorMessage = 'User not found in the Database';
                return res.status(404).send('User not found');
            }

            if (user.active) {
                res.locals.errorMessage = 'User is already active';
                return res.status(400).send('User is already active');
            }

            user.active = true;
            await user.save();

            return res.status(200).send(user);
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/users/editUser.js';
            // For development convenience; remove in production
            return res.status(500).send('Internal Server Error: backend/handlers/user/editUser.js');
        }
    });
}

export default recoverUser;
