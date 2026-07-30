import express from "express";

import {addProduct,getProducts,getSingleProduct,updateProduct,deleteProduct}from "./product.controller.js";

import { verifyToken } from "../../middleware/verifyToken.js";
import { isAdmin } from "../../middleware/isAdmin.js"; /////////////

export const productRoutes = express.Router();
productRoutes.use(express.json());

productRoutes.get("/products", getProducts);
productRoutes.get("/products/:id", getSingleProduct);

productRoutes.post("/products", verifyToken, isAdmin, addProduct);
productRoutes.put("/products/:id", verifyToken, isAdmin,updateProduct);
productRoutes.delete("/products/:id", verifyToken, isAdmin,deleteProduct);