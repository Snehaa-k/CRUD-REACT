import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Userlogin from './pages/Userside/Userlogin'
import Usersignup from './pages/Userside/Usersignup'
import './App.css'
// import ProtectedRoute from './components/protectedroute/ProtectedRoute'
import Userhome from './pages/Userside/Userhome'
import Profile from './components/Userside/Userprofile/Profile'
import Userlist from './pages/Adminside/Userlist'
import Adminlogin from './pages/Adminside/Adminlogin'
// import ProtectedRoute from './components/ProtectedRoute'





function App() {
  
  

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Userlogin />} />
         <Route path='/signup' element={<Usersignup />} />
        {/* <ProtectedRoute path="/home" element={<Userhome />} />  */}
        <Route path = '/profile' element = {<Profile/>}/>
        <Route path = '/home' element = {<Userhome/>}/>

        <Route path = '/adlogin' element = {<Adminlogin/>}/>
        <Route path = '/userlist' element = {<Userlist/>}/>


        

        {/* <Route path='/profile' element={<Profile />} /> */}

      </Routes>
    </Router>
      
    </>
  )
}

export default App
