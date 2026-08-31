import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
        trim: true
    },

    last_name: {
        type: String,
        required: false,
        trim: true,
        default: ""
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },

    password: {
        type: String,
        required: false,
        default: null
    },

    role: {
        type: String,
        enum: ["user", "organizer", "admin"],
        default: "user"
    },

    provider:{
        type: String,
        enum: ["local", "github"],
        default: "local"
    },
    
    providerId:{
        type: String,
        default: null
    }
},
{
    timestamps: true
});

const User = mongoose.model(
    "User",
    userSchema
);

export default User;
