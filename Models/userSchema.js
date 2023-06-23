import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, default:false, required:true}
   
})
const User = mongoose.model("users", userSchema)
export default User
