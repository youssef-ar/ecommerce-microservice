const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/index');

const isAutherizedMiddleware= (req,res,next)=>{
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, jwtSecret);
        if(!decodedToken){
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