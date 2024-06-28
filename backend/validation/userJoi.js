import Joi from 'joi';

export const UserValidation = Joi.object({
    firstName: Joi.string().min(2).max(30).label('First Name').required(),
    lastName: Joi.string().min(2).max(30).label('Last Name').required(),
    email: Joi.string().email().lowercase().trim().label('Email').required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
        .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers')
        .label('Password')
        .required(),
    roleType: Joi.number().integer().label('Role Type').default(10),
    imgSrc: Joi.string().uri().max(600).label('Image Source').allow(''),
    imgAlt: Joi.string().min(5).max(200).label('Image Alternative').allow(''),
});

export const UserLoginValidation = Joi.object({
    email: Joi.string().email().lowercase().trim().label('Email').required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
        .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers')
        .label('Password')
        .required()
});

export const UserValidationWithoutPassword = UserValidation.fork(['password'], (schema) => schema.optional());