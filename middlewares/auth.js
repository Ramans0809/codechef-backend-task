
const errorHandler = require("../utils/errorHandler");
const User=require("../models/usermodel")
const jwt=require("jsonwebtoken")
exports.isauthenticateduser=async(req,res,next)=>{
 const {token}=req.cookies;
  if(!token){
    return(next(new errorHandler("pls login to access this resource"),401))
  }
  
  const decode=jwt.verify(token,process.env.JWT_SECRET)
 req.user=await User.findById(decode.id)
  next()
}