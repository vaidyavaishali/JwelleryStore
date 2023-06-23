import  jwt  from "jsonwebtoken"
export const generateToken = (user)=>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin},
         process.env.JWT_SECRET,
           {
            expiresIn :'30d'
    })
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };


  // let promise = new Promise((reject, resolve)=>{
  //   if(a===2){
  //     console.log("yes")
  //   }
  // })
  // promise.then((res)=>{

  // })


  // let express = require("express")


  import model from "./Models/m.js"
  import express from "express"
  let app = express()
  app.get("/", (req, res)=>{
    res.send("hello")
  })

 app.post("/post", (req, res)=>{

  let data = m.create(req.body)
  res.send(data)
 })


 app.delete("/:id", (req, res)=>{
  res.json({
      message:"data will delete"
  })
 })

 a

  app.listen(6000, ()=>{
    console.log("running")
  })