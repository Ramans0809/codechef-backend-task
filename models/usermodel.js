const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:'Name is required',
        maxLength:[30,"name cannot exceed 30 character"],
        minLength:[4,"name cannot be smaller than 4 character"]
    },
    email:{
        type:String,
       trim:true,
       required:'Email is required', 
    },
    password:{
        type:String,
        required:'password is required',
        minLength:[6,"password should be atleast 6 character"]
    },
    created:{
        type:Date,
        defaut:Date.now()
       }
})

UserSchema.pre("save",async function(next){
    console.log(this.password)
    if(!this.isModified("password")){
      next()
    }
   
    this.password= await bcrypt.hash(this.password,10)
 })

 UserSchema.pre("update",async function(next){
    console.log(this.password)
})

 UserSchema.methods.getJWTtoken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE
    } )
 } 

 UserSchema.methods.comparePassword=async function(pass){
    return await bcrypt.compare(pass,this.password)
} 

module.exports=mongoose.model("User",UserSchema)