const User=require('../models/usermodel')
const errorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwttoken")
module.exports={
    signup:async(req,res,next)=>{
    const {name,password}=req.body
    if(!name || !password){
        return next(new errorHandler("please enter email and password",400))
    }
    const user= await User.findOne({name}).select("+password")
    if(!user){
      return next(new errorHandler("Invalid email or password",401))
    }
    const ispasswordmatch= await user.comparePassword(password)
    if(!ispasswordmatch){
        return next(new errorHandler("Invalid email or password",401))
      }
      sendToken(user,200,res)  
    },
    signout:async(req,res,next)=>{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
          })
          res.status(200).json({
            sucess:true,
            message:"logout sucess"
          })
    }
}