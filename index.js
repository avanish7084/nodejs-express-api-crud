const express=require("express")
const { log } = require("console");
const app=express()
app.use(express.json())

const data=require("./routes/route")
app.use("/api",data)

const port =3000;
app.listen(port,()=>{
    console.log("Server is running on port");
})



