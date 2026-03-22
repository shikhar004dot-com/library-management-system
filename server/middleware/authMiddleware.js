// const jwt=require("jsonwebtoken");
// module.exports=(req, res, next)=>{
//     const token = req.headers["authorization"];
//     if (!token){
//         return res.status(403).json({ message: "No token provided" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err)
//         return res.status(401).json({ message: "Unauthorized" });

//     req.user = decoded;
//     next();
// });

// };
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    console.log("FULL HEADER:", req.headers);
    console.log("TOKEN RECEIVED:", token);

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};