const express=require("express")
const authcntrl=require("../controllers/authController")
const router=express.Router()

router.route('/auth/signin').post(authcntrl.signup)
router.route('/auth/signout').get(authcntrl.signout)
module.exports=router

