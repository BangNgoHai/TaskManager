const jwt = require("jsonwebtoken");

const middlewareControllers = {
    //VerifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            //Bearer 123456
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) =>{
                if(err){
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next(); 
            });
        }else{
            res.status(401).json("You are not authenticated");
        }
    },

    //VerifyToken and Adminauth
    verifyTokenAndAdminAuth: (req,res,next) => {
        middlewareControllers.verifyToken(req,res, () => {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }else{
                res.status(403).json("Yor're not allowed to delete other");
            }
        });
    }
}

module.exports = middlewareControllers;