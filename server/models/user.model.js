import mongoose from "mongoose";
 

const userschema= new mongoose.Schema({
    name:{
        type:String,
         required:[true,"providepassword"]  
    },
    email:{
        type:String,
        required:[true,"provideemail"],
        unique:true

    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
    avatar:{
        type:String,
        default:""

    },
    verify_ermail:{
        type:Boolean,
        default:false
    },
    refresh_token:{
        type:String,
        default:""
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["active","inactive","suspended"],
        default:"active"
    },
address:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"address"
    }
],
shopping_cart:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"cartproduct"
    }
],
order_history:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"order"
    }
],
forgot_password_otp:{
    type:String,
    default:null

},
forgot_password_expiry:{
    type:Date,
    default:""
},
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
}



},{
    timestamps:true
})

const usermodel=mongoose.model("user",userschema)
export default usermodel