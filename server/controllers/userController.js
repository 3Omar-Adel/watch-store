const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    )
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Data verification هنتحقق من البيانات
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        // Data verification هنتحقق من اليوزر بس
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        // تشفير الباسورد
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt);
        // 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "Invaild Email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invaild Email or password",
            });
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
}