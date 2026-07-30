import { cartModel } from "../../../db/models/cart.model.js";

export async function addToCart(req, res) {
    req.body.user = req.decoded._id;
    let cart = await cartModel.create(req.body);
    res.json({message: "added to cart",cart});
}

export async function getCart(req, res) {
    let cart = await cartModel.find({
        user: req.decoded._id
    }).populate("product");

    res.json({
        message: "your cart",cart});
}

export async function updateCart(req, res) {
    let updated = await cartModel.findByIdAndUpdate(
        req.params.id,req.body,{ new: true }
    );

    res.json({message: "updated",updated
    });
}

export async function deleteCart(req, res) {
    await cartModel.findByIdAndDelete(req.params.id);

    res.json({message: "deleted"});
}

export function checkout(req, res) {
    res.json({message: "Checkout completed successfully. Thank you for your order."});
}