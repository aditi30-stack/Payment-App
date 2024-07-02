const SECRET = "/backend/config.js"
const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({"Error": "Token is not present"})
        
        
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } 

    } catch(e) {
       res.status(403).json({
        "Error": "Token is not right. Please put right token"
       });

    }

}






module.exports = {
    authMiddleware

} 


