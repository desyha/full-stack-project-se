import jwt from "jsonwebtoken"

export const verifyToken= (req, res, next) => {
    const token = req.cookies.token
    console.log('Token:', token);
    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
    if(!token) return res.status(401).json({message: "not Authenticated"})
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload)=>{
            if(err) return res.status(403).json({message: "token not valid"})
            req.userId = payload.id
            next()
            }    
        )
}