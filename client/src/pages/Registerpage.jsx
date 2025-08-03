import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Registerpage = () => {
  const [showpassword, setshowpassword] = useState(false);
const [data, setdata] = useState({
  name:"",
  email:"",
  password:""
})

  const handleclick = (e) => {
    setshowpassword(!showpassword);
  };
  const icon = showpassword ? <FaEyeSlash /> : <FaEye />;
  const handleclick2=()=>{

  }
  const handlechange = (e)=>{
    setdata((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))


  }
const handlesubmit=async(e)=>{
  e.preventDefault()
  try {
      const response = await fetch("http://localhost:8080/api/user/register",{
    method:"post",
      headers: {
      "Content-Type": "application/json", // tells the server you're sending JSON
    },
    body:JSON.stringify(data)

  })
const result = await response.json()
  console.log(result)
    
  } catch (error) {
    console.log(error)
    
  }


}



  return (
    <section className="min-h-[75vh] bg-zinc-600  w-full py-4 flex items-center justify-center">
      <div className=" w-full max-w-lg  bg-white px-2 py-2 ">
        <p> blinkit</p>

        <form action="" onSubmit={handlesubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
            onChange={handlechange}
            
              type="text"
              id="name"
              value={data.name}
              placeholder="write your name "
              autoFocus
              className="border "
              name="name"
            />
          </div>
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
            <input
         
              type="password"
              id="confirmpassword"
              placeholder="write your password "
              autoFocus
              className="border "
              name="confirmpassword"
            />
          </div>

          
            <button className="text-center bg-green-900 w-full my-2">submit</button>
          
        </form>
      </div>
    </section>
  );
};

export default Registerpage;
