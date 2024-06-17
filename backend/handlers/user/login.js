import User from "../../models/User.js";
import { UserLoginValidation } from "../../validation/userJoi.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = app => {
    app.post('/login', async (req, res) => {
        try {
            const { error, value } = UserLoginValidation.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                res.locals.errorMessage = errorObj.join(', '); // Store the custom error message
                return res.status(400).send(errorObj);
            }

            const { email, password } = value;
            const user = await User.findOne({ email });

            if (!user) {
                res.locals.errorMessage = 'Email is incorrect'; // if the logs file are public then 'email or password is incorrect'
                return res.status(401).send('email or password is incorrect');
            };

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                res.locals.errorMessage = 'password is incorrect'; // if the logs file are public then 'email or password is incorrect'
                return res.status(401).send('email or password is incorrect');
            };

            const token = jwt.sign({
                userId: user._id,
                roleType: user.roleType
            }, process.env.JWT_SECRET, { expiresIn: '5h' }); // in production change to '1h' or more

            res.send({
                message: `Hey ${user.fullName.firstName}, you have successfully logged in.`,
                token
            });

        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/user/login.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/login.js');
        }

    });
}

export default login; 
