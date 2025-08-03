import {Router} from "express"
import { forgotpassword, logoutcontroller, refreshtoken, resetpassword, updateinfo, uploadavatar, verifyforgotpasswordotp } from "../controller/user.controller.js"
import {verifyemailcontroller} from "../controller/user.controller.js"
import {logincontroller} from '../controller/user.controller.js'
import auth from "../middleware/auth.js"
import { registerusercontroller } from "../controller/user.controller.js"
import upload from "../middleware/multer.js"
const userroute = Router()
userroute.post("/register",registerusercontroller)

userroute.post("/verify-email",verifyemailcontroller)
userroute.post("/login",logincontroller)
userroute.get("/logout",auth,logoutcontroller)
userroute.put("/upload-avatar",auth,upload.single("avatar"),uploadavatar)
userroute.put("/update",auth,updateinfo)
userroute.put("/forgot-password",forgotpassword)
userroute.put("/verify-forgot-password-otp",verifyforgotpasswordotp)
userroute.put("/reset-password",resetpassword)
userroute.post("/refresh_token",refreshtoken)
export default userroute
