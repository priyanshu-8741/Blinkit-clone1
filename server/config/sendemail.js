import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config
if(!process.env.RESEND_API){
    console.log("provide resend api inside the dotenv file")
}


const resend = new Resend(process.env.RESEND_API);


const sendemail =async ({sendto,subject,html})=>{

try {


  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });
  if(error){
    return console.error({error})
  }


return data;
    
} catch (error) {
    console.log(error)
    
}



}

export default sendemail

