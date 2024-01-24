import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username field is required!'],
        unique: [true, 'Email is already taken']
    },
    fullName: {
        type: String,
        required: [true, 'Full Name field is required!']
    },
    email: {
        type: String,
        required: [true, 'email field is required!'],
        unique: [true, 'Email is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password field is required!']
    },
},{
    timestamps: true,
});

const User = model('User', userSchema);

export default User;