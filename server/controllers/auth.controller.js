import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body
        
        // ✅ Validation add kar
        if(!email || !name) {
            return res.status(400).json({message: "Name and email are required"})
        }
        
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name, 
                email
            })
        }
        
        let token = await getToken(user._id)
        
        // ✅ Cookie options fix - secure false for development
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // ✅ Localhost ke liye false
            sameSite: "lax", // ✅ "lax" try kar, "none" requires HTTPS
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        // ✅ User object mein token mat bhej (optional)
        const userWithoutToken = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        
        return res.status(200).json({
            success: true,
            user: userWithoutToken
        })
        
    } catch (error) {
        console.error("Google Auth Error:", error)
        return res.status(500).json({message: `googleSignup Error ${error.message}`})
    }
}

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,  // ✅ Same as above
            sameSite: "lax",
            path: "/"
        })
        return res.status(200).json({message: "LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message: `Logout Error ${error.message}`})
    }
}
