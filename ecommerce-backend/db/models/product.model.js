import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({name: String,description: String,price: Number,stock: Number,image: String,
    createdBy: {type: mongoose.Types.ObjectId,ref: "User"
    }
}, {timestamps: true,versionKey: false});

export const productModel = model("Product", productSchema);