let exp=require("express");
const { dbConnect } = require("./dbConnection");
const { ObjectId } = require("mongodb");
let app=exp();
app.use(exp.json());
// CORS ke liye
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/library-read",async(request,response)=>{
    try{
        let myDB=await dbConnect();
        let BookCollection=myDB.collection("books");
        let data=await BookCollection.find().toArray();
        let resObj={
            status:1,
            message:"data fetched",
            data
        }
        response.send(resObj);
    }
    catch(err) {
        response.status(500).send({
            status: 0,
            message: err.message
        })
    }
    
});
app.post("/library-insert",async(request,response)=>{
    try {
        let{title,author,status="Available" }=request.body;
        if (!title || !author){
            return response.send({
                status: 0,
                msg:"title and author required"
            });
        }
        let myDB=await dbConnect();
        let BookCollection=myDB.collection("books");
        let insertRes = await BookCollection.insertOne({ title, author, status });
        let resObj = {
            status: 1,
            msg: "data inserted",
            insertRes
        };
        response.send(resObj);
    } catch (err){
        response.status(500).send({
            status:0,
            msg: err.message
        });
    }
});

app.delete("/library-delete/:id",async(request,response)=>{
    try{
        let {id}=request.params;
        let myDB=await dbConnect();
        let BookCollection = myDB.collection("books");
        let delRes=await BookCollection.deleteOne({ _id: new ObjectId(id) });
        let resObj={
            status:1,
            msg:"data deleted",
            delRes
        };
        response.send(resObj);
    } catch (err) {
        response.status(400).send({
            status: 0,
            msg: "invalid id"
        });
    }
});
app.put("/library-update/:id", async (request, response) => {
    try {
        let {id}=request.params;
        let {status}=request.body;
        let myDB=await dbConnect();
        let BookCollection=myDB.collection("books");
        let updateRes=await BookCollection.updateOne(
            {_id:new ObjectId(id)},
            {$set:{status}}
        );
        response.send({
            status: 1,
            msg: "status updated",
            updateRes
        });
    } catch(err){
        response.status(400).send({
            status: 0,
            msg: "update failed"
        });
    }
});
app.delete("/library-clearall",async(request,response)=>{
    try {
        let myDB = await dbConnect();
        let BookCollection = myDB.collection("books");
        let delRes = await BookCollection.deleteMany({});
        response.send({
            status: 1,
            msg: "all books deleted",
            delRes
        });
    } 
    catch(err){
        response.status(500).send({
            status: 0,
            msg: "failed to clear books"
        });
    }
});



app.listen(8000,()=>console.log("Server running on port 8000"));


