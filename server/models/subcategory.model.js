import mongoose from "mongoose";
 
const subcategoryschema=new mongoose.Schema({
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
    ]
},{
    timestamps:true
})
const subactegorymodel= mongoose.model("subcategory",subcategoryschema)
export default subactegorymodel