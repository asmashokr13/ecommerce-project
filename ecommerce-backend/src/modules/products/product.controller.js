import { productModel } from "../../../db/models/product.model.js";

export async function addProduct(req,res){
    req.body.createdBy = req.decoded._id
    let addedProduct = await productModel.create(req.body)
    res.json({
        message:"product added successfully",addedProduct})
}

export async function getProducts(req, res) {

    let filter = {};
    if (req.query.name) {
        filter.name = {$regex: req.query.name,$options: "i"};
    }

    if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) {
            filter.price.$gte = Number(req.query.minPrice);
        }
        if (req.query.maxPrice) {
            filter.price.$lte = Number(req.query.maxPrice);
        }
    }

    let products = await productModel
        .find(filter)
        .populate("createdBy", "name email");

    res.json({message: "all products",products});
}

export async function getSingleProduct(req,res){

    let product = await productModel.findById(req.params.id)
    res.json({message:"product",product})
}

export async function updateProduct(req,res){

    let updated = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true}
    )

    res.json({message:"updated",updated
    })
}

export async function deleteProduct(req,res){

    await productModel.findByIdAndDelete(req.params.id)
    res.json({message:"deleted successfully"})
}