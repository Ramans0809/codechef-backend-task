const User=require('../models/usermodel')
const errorHandler = require("../utils/errorHandler")
const bcrypt=require("bcryptjs")
module.exports={
    create:async(req,res,next)=>{
        const {name,email,password}=req.body
        const usernameExists = await User.findOne({ name });
        if (usernameExists) return next(new errorHandler('Username already exists',400));
        const user=await new User({
            name,email,password
        })
        await user.save()
        res.status(201).json("user created sucessfully")
    },
    update:async(req,res,next)=>{
        const {name,password,email}=req.body
        const usernameExists = await User.findOne({ name });
        if (usernameExists) return next(new errorHandler('Username already exists',400));
        let user=await User.findById(req.params.id)
        if(!user){
            return next(new Errorhandler("user not found",404))
        }
        const hashedValue=await bcrypt.hash(password,10)
        user.name=name
        user.email=email
        user.password=hashedValue
        await user.save()
   
        
        return res.status(200).json({
            sucess:true,
            user
        })
    }
}