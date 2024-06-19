import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import { UserValidation } from '../../validation/userJoi.js';

const signup = app => {
    app.post('/signup', async (req, res) => {
        try {
            // validate the req.body using Joi 
            const { error, value } = UserValidation.validate(req.body, { abortEarly: false });

            // if the validation failed extarct the message from the err and log it
            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                // Store the custom error message
                res.locals.errorMessage = `\n${errorObj.join(', \n')}`;
                // Send the custom error message
                return res.status(400).send(errorObj);
            }

            const { email, password } = value;

            // hashing the password 
            const hashedPassword = await bcrypt.hash(password, 10);

            // Check for email duplicity/unique identifier
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                res.locals.errorMessage = 'Email already exists';
                return res.status(400).send('Email is already exists');
            }

            // saving the newUser with the hashed password
            const newUser = new User({
                ...value,
                password: hashedPassword
            });

            await newUser.save();
            // sending a message *! IMPORTANT DO NOT SEND newUser to the front (it contains the password inside)!*
            res.status(200).send('You have successfully signed up');
        }
        catch (err) {
            res.locals.errorMessage = 'Internal Server Error: backend/handlers/user/signup.js';
            // only for Dev convinece i'll show where the error come from, need to delete while production 
            return res.status(500).send('Internal Server Error: backend/handlers/user/signup.js');
        }
    })
}

export default signup; 
