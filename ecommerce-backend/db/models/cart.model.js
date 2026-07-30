import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
user:{type: mongoose.Types.ObjectId,ref: "User"},
product: { type: mongoose.Types.ObjectId,ref: "Product"},
quantity: {type: Number,default: 1}
}, 
{ timestamps: true, versionKey: false});
export const cartModel = model("Cart", cartSchema);