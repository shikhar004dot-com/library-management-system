const mongoose=require("mongoose")

console.log("MONGO_URI:",process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err))