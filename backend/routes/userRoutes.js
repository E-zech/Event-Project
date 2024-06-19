import signup from '../handlers/user/signup.js';
import login from '../handlers/user/login.js';
import getUser from '../handlers/user/getUser.js';
import getAllUsers from '../handlers/user/getAllUsers.js';
import editUser from '../handlers/user/editUser.js';
import deleteUser from '../handlers/user/deleteUser.js';
import recoverUser from '../handlers/user/recoverUser.js';
import changeRoleType from '../handlers/user/changeRoleType.js';

export default function userRoutes(app) {
    signup(app);
    login(app);
    getAllUsers(app);
    getUser(app);
    editUser(app);
    deleteUser(app);
    recoverUser(app);
    changeRoleType(app);
}  