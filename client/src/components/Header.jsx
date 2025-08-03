import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Usemobile from '../hooks/Usemobile'
import { FaCartShopping } from "react-icons/fa6";
const Header = () => {

  const [ismobile]=Usemobile()
  const location = useLocation()
  const issearchpasge = location.pathname ==="/search"
  const navigate = useNavigate
  const redirecttologin=()=>{
        navigate("/login")
  }


  return (


   <header className=' h-28 lg:h-17 shadow-md  sticky top-0  flex flex-col gap-2 w-full items-center justify-center'>
  {
   !(issearchpasge&&ismobile)&&(<div className="container flex justify-between py-2 lg: h-full  bg-amber-300 min-w-full px-2">
{/* logo */}
<Link to={"/"}  className="img ">
  <img src={logo}
  height={60}
  width={170}
   alt="logo" 
   className=' hidden lg:block'/>
     <img src={logo}
  height={60}
  width={120}
   alt="logo" 
   className=' lg:hidden'/>



</Link>
<div className=" h-full hidden lg:block">
  <Search/>
</div>
<div className="login-car
 flex gap-5 items-center">
<button to={"/login"}>login</button>
<button>
  <div className="car ">
    <FaCartShopping size={30}/>
  </div>
  
</button>

</div>

</div>)
  }

<div className="anothersearch lg:hidden w-1/2  ">
  <Search/>

</div>





{/* search */}

{/* login and cart */}

   </header>
  )
}

export default Header
