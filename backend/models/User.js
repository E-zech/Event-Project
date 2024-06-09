import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        }
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    roleType: {
        type: Number,
        default: 10,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
    }
});

const User = mongoose.model("users", userSchema);
export default User;

export const RoleTypes = {
    user: 10,
    businessUser: 20,
    admin: 30,
    master: 40,
};