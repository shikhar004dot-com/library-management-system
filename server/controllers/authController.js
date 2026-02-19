const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL="shikharsrivastava816@gmail.com";
const ADMIN_PASSWORD=bcrypt.hashSync("admin123", 8);

exports.adminLogin=async(req,res)=>{
    const {email,password}=req.body;
    if (email !== ADMIN_EMAIL)
        return res.status(401).json({message:"Invalid email"});
    const passwordIsValid=bcrypt.compareSync(password,ADMIN_PASSWORD);
    if (!passwordIsValid)
        return res.status(401).json({message:"Invalid password"});
    const token=jwt.sign(
        {email,role:"admin" },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({token,role:"admin"});
};
const STUDENT_EMAIL="student@library.com";
const STUDENT_PASSWORD=bcrypt.hashSync("student123", 8);

exports.studentLogin=async(req,res)=>{
    const {email, password}=req.body;
    if(email !=="student@library.com")
        return res.status(401).json({message:"Invalid email"});
    if(password !== "student123")
        return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign(
        { email, role: "student" },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );

    res.json({ token, role: "student" });
};


