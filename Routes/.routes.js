// import model from "./Models/m.js"
//   import express from "express"
  import data from "../data.js"
//   let app = express()
//   app.get("/", (req, res)=>{
//     res.send("hello")
//   })

//  app.post("/post", (req, res)=>{

//   let data = m.create(req.body)
//   res.send(data)
//  })


//  app.delete("/:id", (req, res)=>{
//   res.json({
//       message:"data will delete"
//   })
//  })


// app.listen(6000, ()=>{
//     console.log("running")
// })





let arr =  data.products.filter((items)=>{
    return(
        items.category === "Ring"
    )
})
console.log(arr)
