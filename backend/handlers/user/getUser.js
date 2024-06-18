import User from '../../models/User.js';
import { guard } from '../../middleware/guard.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';

const getUser = app => {
    app.get('/user/:id', guard, authorizeUser, async (req, res) => {
        try {
            const { paramsId } = res.locals.userAccess;

            const userByParams = await User.findOne({
                _id: paramsId,
                active: true
            }).select('-password');

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
