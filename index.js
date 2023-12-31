import express from "express"
import mongoose from "mongoose"
// import dotenv from "dotenv"
import productRouter from "./Routes/productRoutes.js";
import userRouter from "./Routes/userRouter.js";
import orderRouter from "./Routes/orderRoutes.js";
import dummydataRoutes from "./Routes/dummyDataRoutes.js";
import cors from "cors"

// dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/seed", dummydataRoutes)


mongoose.connect("mongodb+srv://test:test@cluster0.axud0ps.mongodb.net/").then((res) => {
    console.log("connected to db")
}).catch((e) => {
    console.log(e.message)
})

const port = 8000

app.use("/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

app.get("/api/keys/paypal", (req, res)=>{
    res.send("AXpP0USwRvNXhcFCYr431cbfG6Lt5FtTEm-ytxiI9Bzk5OUvo2zsBGW3-E9bvX5FglAOXP0y9m9AvCWZ" || "sandbox");
})
// app.use("/seed", seedRouter)

// app.use("/", m)

app.use((err, req, res, next)=>{
    res.status(500).send({message:err.message});
})

app.listen(port, () => {
    console.log(`Server running @ http://localhost:${port}`);
})