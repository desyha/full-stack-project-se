import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "not Authenticated" });

    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY); // Log the secret key to ensure it is set

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "token not valid" });
        req.userId = payload.id;
        next();
    });
};

export default verifyToken;
