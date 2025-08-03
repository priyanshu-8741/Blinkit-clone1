const verifyemailtemplate = ({name,url})=>{
    return `
   <p>Dear ${name}</p>
   <p>thank you for registering in blinkit</p>
   <a href=${url} style:"color:white;background : blue;margin-top :10px">
   VERIFY EMAIL
   </a>



    `
}
export default verifyemailtemplate