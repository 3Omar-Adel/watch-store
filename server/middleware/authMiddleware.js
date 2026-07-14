const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        return res.status(401).json({
            message: "Not Authorized, NO Token"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not Authorized, Token Failed"
        })
    }
}

const admin = (req, res, next) =>{
    if(req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(401).json({
            message: "Not Authorized as Admin"
        })
}

module.exports = {
    protect,
    admin,
}