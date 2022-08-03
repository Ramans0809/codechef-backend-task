const express=require("express")
const dotenv=require("dotenv")
const cors =require("cors")
dotenv.config({path:'./config.env'})
const cookieParser =require("cookie-parser")
const port=process.env.PORT || 4000
const mongoose=require("mongoose")
const error=require("./middlewares/error")
const userRoutes=require("./routes/userroutes")
const authroutes=require("./routes/authroutes")
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/',userRoutes)
app.use("/",authroutes)

app.use(error)


mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})

app.listen(port,()=>{
    console.log(`server connected on ${port}`)
})



