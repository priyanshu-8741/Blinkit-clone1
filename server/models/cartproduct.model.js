import mongoose from "mongoose";
const cartproductschema=new mongoose.Schema({
    productid:{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Number,
        default:1
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }

},{
    timestamps:true
})
const cartproductmodel = mongoose.model("cartproduct",cartproductschema)
export default cartproductmodel