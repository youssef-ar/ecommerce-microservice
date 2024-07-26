const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/index');

const isAutherizedMiddleware= (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        
        const decodedToken = jwt.verify(token, jwtSecret);
        if(decodedToken.email!=="test@example.com"){
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decodedToken;
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
      }

}

module.exports = isAutherizedMiddleware;