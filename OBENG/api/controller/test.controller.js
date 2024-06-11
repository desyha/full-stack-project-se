import jwt from "jsonwebtoken"

export const shouldBeUser = async (req, res) => {
    console.log(req.userId)
    res.status(201).json({message: "you are Authenticated"})
}

export const shouldBeOwner = async (req, res) => {
    const token = req.cookies.token
    if(!token) return req.status(401).json({message: "not Authenticated"})
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload)=>{
            if(err) return res.status(403).json({message: "token not valid"})
            if(payload.role != "owner") return  res.status(403).json({message: "not authorized"})
            }
        )
    res.status(201).json({message: "you are Authenticated"})
}