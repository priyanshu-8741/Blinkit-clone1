import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx";
import Searchpage from "../pages/Searchpage.jsx";
import Registerpage from "../pages/registerpage.jsx";
import Login from "../pages/Login.jsx";
import Forgot_Password from "../pages/Forgot_Password.jsx";
import Otpverification from "../pages/Otpverification.jsx";
import Resetpage from "../pages/Resetpage.jsx";



const router = createBrowserRouter([

{
    path:"/",
    element:<App/>,
    children:[{
      path:"",
      element:<Home/>
        
    },  {

  path:"search",
  element:<Searchpage/>
},{
  path:"/register",
  element:<Registerpage/>
},{
 path:"/login",
 element: <Login/>
},{
  path:"/forgotpassword",
  element:<Forgot_Password/>
},{
  path:"/otpverification",
  element:<Otpverification/>
},{
  path:"/reset-password",
  element:<Resetpage/>
}


]


}




])
export default router