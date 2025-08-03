import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINAR_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})

const uploadimagecloudinary = async (image)=>{
    const buffer = image?.buffer  ||Buffer.from(await image.arrayBuffer)
    const uploadimage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder : "blinkeyit"},(error,uploadresult)=>{
            return resolve(uploadresult)


        }).end(buffer)
          
        

    })

    return uploadimage
    
}
export default uploadimagecloudinary