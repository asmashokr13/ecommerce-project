import express from "express";

import{addToCart,getCart,updateCart,deleteCart,checkout}from "./cart.controller.js";

import{verifyToken}from"../../middleware/verifyToken.js";

export const cartRoutes = express.Router();
cartRoutes.use(express.json());

cartRoutes.post("/cart", verifyToken, addToCart);
cartRoutes.get("/cart", verifyToken, getCart);
cartRoutes.put("/cart/:id", verifyToken, updateCart);
cartRoutes.delete("/cart/:id", verifyToken, deleteCart);
cartRoutes.get("/checkout", verifyToken, checkout);