require("dotenv").config()
const express=require("express")
const cors=require("cors")
const path=require("path")
const dbConnect=require("./config/db")

const authRoutes=require("./routes/authRoutes")
const libraryRoutes=require("./routes/libraryRoutes")
const app=express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname,"../public")))

app.use("/",authRoutes)
app.use("/",libraryRoutes)

const startServer=async()=>{
try{
await dbConnect()
const PORT=process.env.PORT||8000
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})
}catch(err){
console.log("Failed to connect DB",err)
}
}

startServer()