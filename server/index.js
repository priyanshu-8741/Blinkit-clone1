import express from "express"
import cors from "cors"
import dotenv from"dotenv"
dotenv.config()

import connectdb from "./config/mongoose-connection.js"
import cookieparser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import userroute from "./routes/user.route.js"


const app =express();
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cookieparser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false

}))

const PORT=8080||process.env.PORT

app.get("/",(req,res)=>{
   res.json({
    message:"running"
   })
})
app.use("/api/user",userroute)

connectdb().then(()=>{
      app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)


    })

})
   
