import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
userid:{
    type:mongoose.Schema.ObjectId,
    ref:"user"
},
orderid:{
    type:String,
    required:[true,"provide id"],
    unique : true
},
productid:{
    type:mongoose.Schema.ObjectId,
    ref:"product"
},
product_details:{
    name:String,
    image:Array

},
paymentid:{
    type:String,
    default:""

},
paymentstatus:{
    type:String,
    default:""
},
deliveraddress:{
    type:mongoose.Schema.ObjectId,
    ref:"address"
},
subtotalamt:{
type:Number,
default:0
},
totalamnt:{
    type:Number,
    default:0
},
invoicereceipt:{
    type:String,
    default:""
}



},{
    timestamps:true
})
const ordermodel=mongoose.model("order",orderschema)
export default ordermodel