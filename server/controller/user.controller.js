import usermodel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import sendemail from "../config/sendemail.js"
import verifyemailtemplate from "../utils/verifyemailtemplate.js";
import generateaccesstoken from "../utils/generateaccesstoken.js";
import generaterefreshtoken from "../utils/generaterefreshtoken.js";
import uploadimagecloudinary from "../utils/uploadimagecloudinary.js";
import generateotp from "../utils/generateotp.js";
import forgotpasswordtemplate from "../utils/forgotpasswordtemplte";
import jwt  from "jsonwebtoken"

export  async function registerusercontroller(req, res) {
  const { name, email, password } = req.body;
  try {
      if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email,name,password",
        error: true,
        success: false,
      });
    }
    const user = await usermodel.findOne( {email });
    if (user) {
      return res.json({
        message: "already registered email",
        error: true,
        success: false,
      });
    }
    const salt= await bcryptjs.genSalt(10);
    const hashpswrd=await bcryptjs.hash(password,salt)
    const payload={
        name,
        email,
        password:hashpswrd
    }
  
    const newuser=new usermodel(payload)
    const save= await newuser.save()
        const verifyemailurl = `${process.env.FRONTEND_URL}/verify_email?code=${save.id}`
    const verifyemailtemplate  = verifyemailtemplate({name,verifyemailurl})
    const verifyemail= await sendemail({
        sendto:email,
        subject:"verification email from blinkit",
        html: verifyemailtemplate
    })
    return res.json({
        message: "user register successfull",
        error:false,
        success:true,
        data:save
    })

  } catch (err) {}
}
export  async function verifyemailcontroller(){
  let {code} =req.body
  const user = usermodel.findOne({_id:code})
  if(!user){
    return res.status(400).json({
      message:"invalid code",
      error:true,
      success:false
    })
    const upadteuser = await usermodel.updateOne({_id:code},{
      verify_ermail:true
    })
    return res.json({
      message : "verified email",
      error:false,
      success:true
    })
  }
}

// login controller

export async function logincontroller(req,res){
try {

  const {email,password}=req.body
  const user =await usermodel.findOne({email})
if(!user){
  return res.status(400).json({
    message:"user not registered",
    error:true,
    success:false
  })
}
if(user.status!="active"){
  return res.status(402).json({
    message:"contact to admin",
    error:true,
    success:false
  })


}
const checkpasswrd = await bcryptjs.compare(password,user.password)
if(!checkpasswrd){
  return res.status(400).json({
    message:"wrong password",
    error:true,
    success:fasle
  })
}

const accesstoken = generateaccesstoken(user._id)
const refreshtoken =await  generaterefreshtoken(user._id)
const CookieOption ={
  httpOnly: true,
  secure:true,
  samSite:"none"
}
res.cookie("accesstoken",accesstoken,CookieOption)
res.cookie("refreshtoken",refreshtoken,CookieOption)

return res.json({
  message: "login successfully",
  error:false,
  success:true,
  data:{accesstoken:accesstoken,
    refreshtoken:refreshtoken
  }
})

  
} catch (error) {
  return res.status(500).json({
    message:error.message||error,
    error:true,
    success:false
  })
}
}
// logout controller
 export async function logoutcontroller(req,res){
  const userid = req.userid
try {
  const CookieOption = { 
  httpOnly: true,
  secure:true,
  sameSite:"none"
}
res.clearCookie("accesstoken",CookieOption)
res.clearCookie("refreshtoken",CookieOption)
await usermodel.findByIdAndUpdate({_id:userid},{
  refresh_token:""
})

  return res.json({
    message:"logout successfully",
    error:false,
    success:true
  })

  
} catch (error) {
  return res.status(400)
}

 }

 export async function uploadavatar(req,res){

  try {
    const userid = req.userid // auth middleware
    const image = req.file// multer middleware
    const upload = await uploadimagecloudinary(image)
     const updateuser = await usermodel.findByIdAndUpdate({_id:userid },{avatar:upload.url})

     return res.json({
      message: "upload profile",
     
     })
    
  } catch (error) {
    return res.status(400).json({
      message:error
    })
  }

 }


 export async function updateinfo(req,res){
  const {name,password,mobile,email}=req.body
const userid = req.userid
  const hashpassword= ""
  if(password){
     const salt= await bcryptjs.genSalt(10);
     hashpassword=await bcryptjs.hash(password,salt)


  }
   await usermodel.updateOne({_id:userid},{
    ...(name,{name:name}),
      ...(mobile,{mobile:mobile}),
        ...(email,{email:email}),
          ...(password,{password:hashpassword}),
   })
 }

 export async function forgotpassword(req,res){

  try {
    const { email } = req.body

    const user = await usermodel.findOne({email:email})
   if(!user){
    return res.json({
      message:"emailnot avavilabele"
    })
   }
   const otp = generateotp()
   const expiretime = new Date() + 60*60*1000
  await usermodel.findByIdAndUpdate(user._id,{
    forgot_password_otp: otp,
    forgot_password_expiry:expiretime
  })

   await sendemail({
    sendto:email,
    subject:"forgot password otp ",
    html:forgotpasswordtemplate(otp)
    
   })
   res.json({
    message:"otp send to mentioned email address",
    error:false,
    success:true
   })
  } catch (error) {
    
  }



 }

 export async function verifyforgotpasswordotp(req,res){
try {
  const {email , otp}=req.body
  if(!email||!otp){
    return res.status(400).json({
      message:"provide required field email, otp",
      error:true,
      success:false
    })
  }
    const user = await usermodel.findOne({email:email})
      if(!user){
    return res.json({
      message:"emailnot avavilabele"
    })
   }

   const currenttime = new Date()
   if(user.forgot_password_expiry < currenttime){
    return res.status(400).json({
      message: "otp expired",
      error:true
    })
   }
if(otp!==user.forgot_password_otp){
  return res.status(400).json({
    message:"invalid otp",
    error : true,
    success:false
  })
}
// if otp is not expired
//otp === user.forgot_password_otp
user.forgot_password_otp="";
user.forgot_password_expiry=""
await user.save()

return res.json({
  message:"verify  successfully",
  error: false,
  success:true
})


  
} catch (error) {
  return res.json({
    message:error.mesage||error
  })
}
 }


 export async function resetpassword(req,res){
  try {
    const{email,newpassword,confirmpassword}=req.body
    if(!email||!newpassword||!confirmpassword){
      return res.status(400).json({
        message:"provide email newpasword and confirm password",
        error:true,
        success:false
      })
    }
      const user = await usermodel.findOne({email:email})
   if(!user){
    return res.json({
      message:"emailnot avavilabele"
    })
   }
   if(newpassword!==confirmpassword){
          return res.status(400).json({
        message:"please provide same email as new and confirm",
        error:true,
        success:false
      })

   }
      const salt= await bcryptjs.genSalt(10);
    const hashpassword=await bcryptjs.hash(newpassword,salt)


   usermodel.findByIdAndUpdate(user._id,{
       password:hashpassword
 
   })
return res.json({
  message:"passwords changed successfully",
  error:false,
  success:true
})
    
  } catch (error) {
     return res.status(500).json({
      message:error.message||error,
      error:true,
      success:false
     })    
  }
 }

 export async function refreshtoken(req,res){
  try {
    const refreshtoken = res.cookies.refreshtoken || req.header?.authorization.split(" ")[1]
    if(!refreshtoken){
      return res.status(400).json({
        message : "invalid token ",
        error : true,
        success: false
      })
    }
    const verifytoken= await jwt.verify(refreshtoken, process.env.SECRET_KEY_REFRESH_TOKEN)

    if(!verifytoken){
      return res.status(400).json({
        message:"tpken is expired"
      })
    }
    const userid = verifytoken?._id
    const newaccesstoken = await generateaccesstoken(userid)
    const CookieOption ={
  httpOnly: true,
  secure:true,
  samSite:"none"
}
    res.cookie("accesstoken",newaccesstoken,CookieOption)
    return res.json({
      message:"new accesstoken generated",
      data:{
        accesstoken:newaccesstoken
      }
    })

    


    

  } catch (error) {
    return res.status(500).json({
      message:error.message||error,
      error:true,success:false
    })
    
  }
 }

 export async function userdetails(req,res){
const userid = req.userid 
 const user = await usermodel.findById(userid).select("-password");
 res.json({
  message:"we get userdetails",
  error:false,
  data:user
 })



 }
