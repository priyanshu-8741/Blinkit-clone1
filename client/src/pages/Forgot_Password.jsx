import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
const Forgot_Password = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
  });
  const navigate = useNavigate()


  const handlechange = (e) => {
    setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/forgot-password", {
        method: "put",
        headers: {
          "Content-Type": "application/json", // tells the server you're sending JSON
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
     const notify = () => toast(result.message);
     notify()
     
     navigate("/otpverification",{
        state:data

     })
     

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-[75vh] bg-zinc-600  w-full py-4 flex items-center justify-center">
      <div className=" w-full max-w-lg  bg-white px-2 py-2 ">
        <p> blinkit</p>

        <form action="" onSubmit={handlesubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              value={data.email}
              onChange={handlechange}
              type="text"
              id="email"
              placeholder="write your email "
              autoFocus
              className="border "
              name="email"
            />
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

export default Forgot_Password;
