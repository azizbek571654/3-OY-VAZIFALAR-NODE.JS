import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
    },
    password: {
        type: String,
        trim: true,
        require: true,
    }
},
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema)