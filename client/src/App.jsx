
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'

function App() {


  return (
    <>   
        


    <Header/>
    
     <main>
     <Outlet/>
   </main>
   <Footer/>
   
   </>

  )
}

export default App
