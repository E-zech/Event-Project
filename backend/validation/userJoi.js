import Joi from 'joi';

export const UserValidation = Joi.object({
    fullName: Joi.object({
        firstName: Joi.string().min(2).max(30).required().label('First Name'),
        lastName: Joi.string().min(2).max(30).required().label('Last Name'),
    }).required(),

    email: Joi.string().email().lowercase().trim().required().label('Email'),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
        .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.')
        .required()
        .label('Password'),

    roleType: Joi.number().integer().label('Role Type').default(10),

    imgSrc: Joi.string().uri().max(600).label('Image Source').allow(''),

    imgAlt: Joi.string().max(200).label('Image Alternative').allow(''),
});