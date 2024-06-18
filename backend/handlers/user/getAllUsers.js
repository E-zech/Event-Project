import User from '../../models/User.js';
import { adminGuard, guard } from '../../middleware/guard.js';

const getAllUsers = app => {
    app.get('/users/all', guard, adminGuard, async (req, res) => {
        try {
            const allUsers = await User.find({ active: true }).select('-password');
            if (!allUsers || allUsers.length === 0) {
                res.locals.errorMessage = 'No users found in the database';
                return res.status(404).send('The request could not be completed because no users were found.');
            }
            res.send(allUsers);
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/users/getAllUsers.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/getAllUsers.js');
        }
    });
}
export default getAllUsers; 
