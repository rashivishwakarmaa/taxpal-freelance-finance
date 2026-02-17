const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


/**
* - user register controller
* - POST /api/auth/register
*/

async function userRegisterController(req,res){
    const { email, password,name } = req.body

    const isExist = await userModel.findOne({
        email: email
    })

    if (isExist) {
        return res.status(422).json({
            message: "User already exists with this email",
            status: "failed"
        })
    }
    const user = await userModel.create({
        email, password, name, country: req.body.country || "US"
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:"3d"})

    res.cookie("token" , token)
    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            country: user.country || "US"
        },
        token
    })
}

/**
 * - user login controller
 * - POST /api/auth/login
 */

async function userLoginController(req,res){
    const { email, password } = req.body

    const user = await userModel.findOne({
        email: email
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or Password is INVALID",
            status: "failed"
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Email or Password is INVALID",
            status: "failed"
        })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:"3d"})

    res.cookie("token" , token)
    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            country: user.country || "US"
        },
        token
    })
}

async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.userId).select("-password")
        if (!user) return res.status(404).json({ message: "User not found", status: "failed" })
        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                country: user.country || "US"
            },
            status: "success"
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to fetch user", status: "failed" })
    }
}

async function updateProfile(req, res) {
    try {
        const { country } = req.body
        const allowed = ["US", "IN", "GB", "CA"]
        const updates = {}
        if (country !== undefined) {
            const c = String(country).toUpperCase()
            if (!allowed.includes(c)) return res.status(400).json({ message: "Invalid country. Use US, IN, GB, or CA", status: "failed" })
            updates.country = c
        }
        const user = await userModel.findByIdAndUpdate(req.userId, updates, { new: true }).select("-password")
        if (!user) return res.status(404).json({ message: "User not found", status: "failed" })
        return res.status(200).json({
            user: { _id: user._id, email: user.email, name: user.name, country: user.country || "US" },
            status: "success"
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to update profile", status: "failed" })
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    getMe,
    updateProfile
}