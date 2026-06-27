import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true, default: null },
    password: { type: String, default: null },
    lastUsernameChange: { type: Date, default: null },
    image: { type: String, default: null }, // Social login avatar URL
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", userSchema);