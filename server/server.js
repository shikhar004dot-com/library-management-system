require("dotenv").config();
require("./config/db");
const express=require("express");
const cors=require("cors");
const path=require("path");
const app=express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"../public")))

const libraryRoutes=require("./routes/libraryRoutes")
const authRoutes=require("./routes/authRoutes")

app.use("/",authRoutes)
app.use("/",libraryRoutes)
app.listen(process.env.PORT||8000,()=>{
    console.log("Server running")
})