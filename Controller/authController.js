const User = require('../model').user;
var jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "gobinda@123"
const JWT_EXP = "3h"


const signUp = async (req, res) =>{

    try{
        let { username, password } = req.body;
        let data = req.body
        const newUser =  await User.create(data);
        res.status(201).json({status:true, message: 'SIGNUP_SUCCESSFULLY', data : newUser});

    }catch(err){
        res.status(500).json({status:false, message: 'ERROR', err});
    }

}  


const login = async (req, res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({ where: {username} });

        if(user == null){
            return res.status(404).json({status:false, message: "USER_NOT_FOUND"});
        }

        const token = await generateJwt(user.dataValues);

        if(!token){
            return res.status(500).json({status:false, message: 'TOKEN_GENERATION_FAIL'})
        }
        res.status(200).json({status:true, message: "USER_AUTHENTICATE_SUCCESSFULLY", token})

    }catch(err){
        res.status(500).json({status:false, message: 'ERROR', err});
    }
} 

const generateJwt =  async (user) => {
    return jwt.sign({
      uid: user.id,
      username : user.username
    },JWT_SECRET_KEY,{
        expiresIn : JWT_EXP
    }); 
};


module.exports = {
    signUp,
    login
}