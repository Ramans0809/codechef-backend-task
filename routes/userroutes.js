const express=require("express")
const usercntrl=require("../controllers/userController")
const { isauthenticateduser } = require("../middlewares/auth")
const router=express.Router()

router.route("/api/user/new").post(usercntrl.create)
router.route("/api/user/:id").put(isauthenticateduser,usercntrl.update)
module.exports=router