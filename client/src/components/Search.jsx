import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


const Search = () => {


  const location = useLocation()
  const islocation = location.pathname==="/search"


  const navigate = useNavigate()
    const redirescttosearch = ()=>{
       navigate("/search")        
    }
  return (
    <div className='border rounded-2xl min-w-[315px]  h-full lg:min-w-[420px] flex  items-center  overflow-hidden'>

     <button className='hover:cursor-pointer'>
        < FaSearch />

     </button>

    

     <div onClick={redirescttosearch}  className='w-full mx-1 p-2 '>


      <div>
    {
      !islocation? 
           <div>
       <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'search milk',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'search rice',
        1000,
        'search eggs',
        1000,
        'search meat',
        1000
      ]}
      
      speed={50}
     
      repeat={Infinity}
    />
    </div>:<div className='h-full '>

        <input type="text" placeholder='search' className=' w-full h-full' />

    </div>


    
    }


    </div>

       

 </div>
    </div>
  )
}

export default Search
