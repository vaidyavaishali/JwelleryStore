import mongoose from "mongoose"

let data = new mongoose.Schema({
    name:{type:String, required:true}
})
let model = mongoose.model("collection", data)
exports.module = model