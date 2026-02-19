const { dbConnect } = require("../config/db");
const { ObjectId } = require("mongodb");
exports.readBooks = async (req, res) => {
    try {
        const db=await dbConnect();
        const data=await db.collection("books").find().toArray();
        res.send({status:1,data});
    } catch(err){
        res.status(500).send({status:0,msg:err.message });
    }
};
exports.insertBook=async(req,res)=>{
    try{
        const{title,author,status="Available"}=req.body;
        if(!title || !author)
            return res.send({status:0,msg:"title and author required"});

        const db=await dbConnect();
        const insertRes=await db.collection("books")
            .insertOne({title,author,status});

        res.send({status:1,insertRes});
    } catch(err){
        res.status(500).send({status:0,msg:err.message});
    }
};

exports.updateBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        const db=await dbConnect();
        const updateRes=await db.collection("books").updateOne(
            {_id:new ObjectId(id)},
            {$set:{status}}
        );
        res.send({status:1,updateRes});
    } catch{
        res.status(400).send({status:0,msg:"update failed"});
    }
};

exports.deleteBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const db=await dbConnect();
        const delRes=await db.collection("books")
            .deleteOne({_id: new ObjectId(id)});

        res.send({status:1,delRes});
    } catch{
        res.status(400).send({status:0,msg:"invalid id"});
    }
};

exports.clearAll=async(req,res)=>{
    try{
        const db=await dbConnect();
        const delRes=await db.collection("books").deleteMany({});
        res.send({status:1,delRes});
    } catch{
        res.status(500).send({status:0,msg:"failed to clear books"});
    }
};
