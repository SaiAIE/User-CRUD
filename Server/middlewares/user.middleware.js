const jwt = require("jsonwebtoken")
const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"No token provided authorization denied"})
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:"Token is not valid"})
        }
        req.userId = decoded.userId
        next()
    })
}

module.exports = authenticateToken