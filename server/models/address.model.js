import mongoose from "mongoose";

const addressachema=new mongoose.Schema({
    address_line:{
        type:String,
        default:""
    
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String,
        default:""
    },
    country:{
      type:String,
      default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    status:{
        tupe:Boolean,
   default:true
    }


},{timestamps:true})


const addressmodel=mongoose.model("address",addressachema)
export default addressmodel