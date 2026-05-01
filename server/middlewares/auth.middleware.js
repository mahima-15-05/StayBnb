const jwt = require('jsonwebtoken');

const authMiddleware = async(req , res , next)=>{
    try {
        const token = req.headers.authorization;

        if(!token || !token.startsWith("Bearer ")){
            return res.status(401).json({message:"Invalid token format"});
        }

        
        const onlyToken = token.split(" ")[1];

        const decoded = jwt.verify(onlyToken, process.env.MY_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token"});
    }
}

module.exports = authMiddleware;