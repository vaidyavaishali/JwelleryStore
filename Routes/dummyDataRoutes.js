import express from 'express';
import Product from "../Models/productSchema.js";
import data from '../data.js'
import User from '../Models/userSchema.js';

const dummydataRoutes = express.Router();

dummydataRoutes.get('/', async (req, res) => {
  const createdProducts = await Product.insertMany(data.products);
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers});

});
export default dummydataRoutes;