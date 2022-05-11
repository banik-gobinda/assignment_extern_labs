
var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "gobinda@123"
const JWT_EXP = "3h"

module.exports.verifyJwtToken = (req,res,next) =>{
    var token;
    if('authorization' in req.headers){
        token = req.headers['authorization'].split(' ')[1];
    }

    if(!token){
        return res.status(403).json({auth:false, message: "NO_TOKEN_PROVIDED"});
    }else{
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(500).send({auth :false , message : 'TOKEN_AUTHENTICATION_FAILED'})
            }else{
                req.orgid= decoded.orgid;
                console.log(decoded);
                next()
            }
        })
    }
}
