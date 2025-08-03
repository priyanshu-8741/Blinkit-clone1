import mongoose from "mongoose";
const categoryschema = new mongoose.Schema({
    name:{
      type:String,
      default:""
    },
    image:{
        type:String,
        default:""
    }
},{
    timestamps:true


})

const categorymodel=mongoose.model('category',categoryschema)
export default categorymodel