import { guard } from '../../middleware/guard.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { isActive } from '../../middleware/isActive.js';

const deleteUser = app => {
    app.delete('/user/:id', guard, authorizeUser, isActive, async (req, res) => {
        try {
            const { user } = res.locals.userAccess;
            user.set({ active: false });

            await user.save();
            res.status(200).send('User has been deleted');
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/users/deleteUser.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/deleteUser.js');
        }
    })

}

export default deleteUser;


