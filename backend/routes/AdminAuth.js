const express=require('express')
const router=express.Router()
const AdminAuthController=require("../controllers/AdminAuth")
const { verifyToken } = require('../middleware/VerifyToken')

router
    .post("/admin-signup",AdminAuthController.signup)
    .post('/admin-login',AdminAuthController.login)
    .post("/admin-verify-otp",AdminAuthController.verifyOtp)
    .post("/admin-resend-otp",AdminAuthController.resendOtp)
    .post("/admin-forgot-password",AdminAuthController.forgotPassword)
    .post("/admin-reset-password",AdminAuthController.resetPassword)
    .get("/admin-check-auth",verifyToken,AdminAuthController.checkAuth)
    .get('/admin-logout',AdminAuthController.logout)


module.exports=router