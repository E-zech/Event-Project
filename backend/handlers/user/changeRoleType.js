import User, { RoleTypes } from '../../models/User.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { adminGuard, guard } from '../../middleware/guard.js';
import { isActive } from '../../middleware/isActive.js';

const changeRoleType = app => {
    app.patch('/user/:id', guard, adminGuard, authorizeUser, isActive, async (req, res) => {
        try {
            const { user } = res.locals.userAccess;

            user.roleType = (user.roleType === RoleTypes.business) ? RoleTypes.none : RoleTypes.business;

            await user.save();
            res.status(200).send(user);
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/users/editUser.js';
            // For development convenience; remove in production
            return res.status(500).send('Internal Server Error: backend/handlers/user/editUser.js');
        }
    });
}

export default changeRoleType;
