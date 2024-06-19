import { guard } from '../../middleware/guard.js';
import { authorizeUser } from '../../middleware/authorizeUser.js';
import { isActive } from '../../middleware/isActive.js';

const getUser = app => {
    app.get('/user/:id', guard, authorizeUser, isActive, async (req, res) => {
        try {
            const { user } = res.locals.userAccess;
            res.status(200).send(user);
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/user/getUser.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/getUser.js');
        }
    })
}
export default getUser; 
