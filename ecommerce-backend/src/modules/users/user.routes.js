import express from "express";
import {signUp,login,getUsers,verifyAccount}from "./user.controller.js";
import {checkEmail} from"../../middleware/checkEmail.js";

export const userRoutes = express.Router()

userRoutes.use(express.json())
userRoutes.post("/users/signup",checkEmail,signUp)
userRoutes.post("/users/login",login)
userRoutes.get("/users/verify/:mail",verifyAccount)
userRoutes.get("/users",getUsers)