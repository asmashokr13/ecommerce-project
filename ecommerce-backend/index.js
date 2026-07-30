import express from "express";
import cors from "cors";
import { dbConnection } from "./db/dbConnection.js";

import { userRoutes } from "./src/modules/users/user.routes.js";
import { productRoutes } from "./src/modules/products/product.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";

const app = express();

dbConnection;

// Enable CORS
app.use(cors());

app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.listen(3000, () => {
    console.log("server running");
});