import expressAsyncHandler from "express-async-handler";
import express from "express";
import Order from "../Models/orderModels.js";
import { isAuth } from "../utilits.js";

const orderRouter = express.Router()
orderRouter.post("/", isAuth, expressAsyncHandler(async (req, res) => {
    const neworder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,

    })
    const order = await neworder.save();
    res.status(201).send({ message: 'New Order Created', order });
}))
orderRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: "Order Not Found" })
    }
}))

orderRouter.put("/:id/payment", isAuth, expressAsyncHandler(async (req, res) => {
    const Neworder = await Order.findById(req.params.id)
    if (Neworder) {
        Neworder.isPaid = true;
        Neworder.paidAt = Date.now();
        Neworder.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        const order = await Neworder.save();
        res.send({ message: "Success", order })
    } else {
        res.status(404).send({ message: "Order Not Found" })
    }
}))
export default orderRouter