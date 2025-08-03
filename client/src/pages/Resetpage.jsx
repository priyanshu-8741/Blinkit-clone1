import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';

const Resetpage = () => {
    const [showpassword, setshowpassword] = useState(false);
  const [data, setdata] = useState({
    password:"",
    confirmpassword:""
  });
  const navigate = useNavigate()
  const location = useLocation()
  if(!location?.state){
    navigate("/")

  }
  const handleclick = (e) => {
    setshowpassword(!showpassword);
  };
  const icon = showpassword ? <FaEyeSlash /> : <FaEye />;



  const handlechange = (e) => {
    setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if(data.password===data.confirmpassword){
try {
  const newrequest = {
    newpassword:data.password,
    confirmpassword:data.confirmpassword,
    email : location.state
  }
      const response = await fetch("http://localhost:8080/api/user/reset-password", {
        method: "put",
        headers: {
          "Content-Type": "application/json", // tells the server you're sending JSON
        },
        body: JSON.stringify(newrequest),
      });
      const result = await response.json();
      console.log(result);
   
     
     toast.success("password is saved")
     

  
    }
    catch (error) {
      console.log(error);
    }
     
  
      
    }
    
    toast("password is not same")
      setdata({
        password:"",
        confirmpassword:""})
  };

  return (
    <section className="min-h-[75vh] bg-zinc-600  w-full py-4 flex items-center justify-center">
      <div className=" w-full max-w-lg  bg-white px-2 py-2 ">
        <p> blinkit</p>

        <form action="" onSubmit={handlesubmit}>
            <div className="grid gap-1">
            <label htmlFor="password">Password:</label>

            <div className="flex "> 
              <input
                onChange={handlechange}
                value={data.password}
                type={showpassword ? "text" : "password"}
                id="password"
                placeholder="write your password "
                autoFocus
                className="border w-full
                 "
                name="password"
              />
              <div onClick={handleclick}> {icon}</div>
            </div>
          </div>
             <div className="grid gap-1">
            <label htmlFor="confirmpassword">Confirmpassword:</label>

            <div className="flex "> 
              <input
                onChange={handlechange}
                value={data.confirmpassword}
                type={showpassword ? "text" : "password"}
                id="confirmpassword"
                placeholder="write your password "
                autoFocus
                className="border w-full
                 "
                name="confirmpassword"
              />
              <div onClick={handleclick}> {icon}</div>
            </div>
          </div>
          <div className=" w-full px-2">  <button className="text-center bg-green-900 w-full my-4 ">
          send otp
          </button></div>
        
          <p>login?</p> <Link to={"/login"}> login</Link>
        </form>
         <ToastContainer />
      </div>
    </section>
  );
};

export default Resetpage
