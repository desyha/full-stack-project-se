import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js"

export const register = async (req, res) => {
    const {username, email, password, role} = req.body
    try{
        const hashPass = await bcrypt.hash(password, 10)
        console.log(hashPass)

        const newUser = await prisma.user.create({
            data:{
                username, 
                email, 
                password:hashPass, 
                role
            }
        })

        console.log(newUser)
        res.status(201).json({message: "user created successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "failed to create user"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        if(email != null && password!= null){
            const user = await prisma.user.findUnique({
                where:{email}
            })
            if(!user) return res.status(401).json({message: "Invalid credidentias"})
            
            const isPassValid = await bcrypt.compare(password, user.password)
            if(!isPassValid) return res.status(401).json({message: "Invalid credidentias"})
    
            const age = 1000 * 60 * 60 * 24 * 7   
    
            const token = jwt.sign({
                id:user.id,
                role:user.role
            }, process.env.JWT_SECRET_KEY, {expiresIn:age})
    
            const {password:userpass, ...userInfo} = user
     
            res.cookie("token", token, {
                httpOnly:true,
                secure:true,
                maxAge: age,
            }).status(200).json({userInfo})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: "failed to login"})
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"logout success"})
}