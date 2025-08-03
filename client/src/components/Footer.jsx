import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
<footer className='border-t'>

<div className= "container mx-auto py-2 bg-amber-200  flex flex-col items-center  lg:flex-row lg:justify-around  " >
<p > 
   © allrights reserved
</p>
<div className=' flex  gap-5' >
    <a href="" >
    <FaFacebook/></a>
    <a href="">
        <FaInstagram />
    </a>
    <a href="">
        <FaLinkedin/>

    </a>
    </div>
</div>
</footer>
  )
}

export default Footer
