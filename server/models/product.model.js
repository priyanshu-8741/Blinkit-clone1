import mongoose from "mongoose";
 const productschema=new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },

    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"category"
        }
    ],
 subcategory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"subcategory"
        }
    ],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    moredetails:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:false
    }
 },{timestamps:true})
 
 const productmodel=mongoose.model("product",productschema)

 export default productmodel
