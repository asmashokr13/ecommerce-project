import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    age: Number,
    email: {type: String,required: true,unique: true},
    password: String,
    role: {type: String,enum: ["admin", "user"], default: "user"},
    isConfirmed: {type: Boolean,default: false}

}, {timestamps: true,versionKey: false});
export const userModel = model("User", userSchema);