import React from 'react'
import { useState , useRef} from "react";
import { Navigate, useLocation } from 'react-router-dom';

const Otpverification = () => {

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);
  const location = useLocation()
  console.log(location)
  const navigate = Navigate()


  

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers and single character
    if (!/^\d?$/.test(value)) return;

    const newData = [...data];
    newData[index] = value;
    setData(newData);

    // Move to next input if current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !data[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit =async () => {
    const otp = data.join('');
    const email = location.state.email;
    const request = {
        otp:otp,
        email:email
    }
    const response =await fetch("http://localhost:8080/api/user/verify-forgot-password-otp",{
        method:"put",
              headers: {
      "Content-Type": "application/json", // tells the server you're sending JSON
    },
    body:JSON.stringify(request)

    })
    const result = await response.json();
    if(result.success){
      navigate("/reset-password",{
        state:request.email
      })
    }
    console.log(result)
  };

  return (
     <section className="min-h-[75vh] bg-zinc-600  w-full py-4 flex items-center justify-center">
      <div className=" w-full max-w-lg  bg-white px-2 py-2  flex flex-col gap-5 items-center ">
      <div className="flex gap-2">
      {data.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-10 text-center border border-gray-400 rounded"
        />
      ))}
        </div>
      <button onClick={handleSubmit} className="ml-4 px-2 py-1 bg-blue-500 text-white rounded">
        Submit
      </button>
  
   </div>

      </section>

)
}
export default Otpverification
 