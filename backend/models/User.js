import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // fullName is an object which nested 2 objects: firstName and lastName

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },


    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },

    // password will be hashed when created (login.js) OR can be hashed here 
    password: {
        type: String,
        required: true,
    },

    roleType: {
        type: Number,
        default: 20,
    },
    // When a user has been deleted active = false
    active: {
        type: Boolean,
        default: true
    },

    imgSrc: {
        type: String,
        maxlength: 600,
    },

    imgAlt: {
        type: String,
        maxlength: 200,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("users", userSchema);
export default User;

export const RoleTypes = {
    none: 10, // non-business user 
    business: 20, // business user
    admin: 30, // manager/admin
    master: 40, // developers
};