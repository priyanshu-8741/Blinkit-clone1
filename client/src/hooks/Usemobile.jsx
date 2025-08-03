import React, { useEffect } from 'react'
import { useState } from 'react'

const Usemobile = (breakpoint = 768) => {
   const [ismobile, setismobile] = useState(window.innerWidth < breakpoint)
   const handleresize =()=>{
    const checkpoint = window.innerWidth<breakpoint
    setismobile(checkpoint)
   }
   useEffect(() => {
    handleresize()


   window.addEventListener("resize",handleresize)
      return()=>{
        window.removeEventListener('resize',handleresize)
      }
   }, [])
   

  return[
ismobile
  ]
}

export default Usemobile
