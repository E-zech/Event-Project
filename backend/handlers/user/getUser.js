import User, { RoleTypes } from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';

const getUser = app => {
    app.get('/user/:id', guard, async (req, res) => {
        try {
            const paramsId = req.params.id;
            const { userId, roleType } = getUserFromTKN(req, res);
            const isAdminOrMaster = roleType === RoleTypes.admin || RoleTypes === roleType.master;

            if (userId !== paramsId && !isAdminOrMaster) {
                res.locals.errorMessage = 'Not authorized';
                return res.status(401).send('you are not authorized to do so');
            }

            const userByParams = await User.findById(req.params.id).select('-password');
            if (!userByParams) {
                res.locals.errorMessage = 'User not found';
                return res.status(403).send('User not found');
            }
            res.send(userByParams);

        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/user/getUser.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/getUser.js');
        }

    })
}

export default getUser; 
