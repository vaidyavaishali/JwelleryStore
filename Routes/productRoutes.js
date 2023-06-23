import express from "express"
import Product from '../Models/productSchema.js'
const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
    // console.log(products)
});
productRouter.get("/unique_indentity/:unique_indentity", async(req, res) => {
    const product = await Product.findOne({unique_indentity:req.params.unique_indentity})
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product Not Found" })
    }

})

productRouter.get("/:id", async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "Product doesn't found" })
    }

})
export default productRouter
