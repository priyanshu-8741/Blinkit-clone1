import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "please give mongodburi"
    )
}
async function connectdb(){
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected");
    
}catch(err){
    console.log(err);
    process.exit(1);


}

}
export default connectdb