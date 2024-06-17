import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Userlogin from './pages/Userside/Userlogin'
import Usersignup from './pages/Userside/Usersignup'
import './App.css'
// import ProtectedRoute from './components/protectedroute/ProtectedRoute'
import Userhome from './pages/Userside/Userhome'
import Profile from './components/Userside/Userprofile/Profile'
import Userlist from './pages/Adminside/Userlist'
import Adminlogin from './pages/Adminside/Adminlogin'
import ProtectedRoute from './components/ProtectedRoute'
import Adminprotected from './components/AdminRoute'
import Userloginprotected from './components/Userloginprotected'
import Userlistprotected from './components/Userlistprotected'



function App() {
  
  

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Userloginprotected><Userlogin /></Userloginprotected>} />
        <Route path='/signup' element={<Usersignup />} />
        {/* <ProtectedRoute path="/home" element={<Userhome />} />  */}
        <Route path = '/profile' element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>

        <Route path = '/home' element = {<ProtectedRoute> <Userhome/></ProtectedRoute>}/>

       {/* <Route path = '/adlogin' element = { <Adminlogin/>}/>   */}
        <Route path = '/userlist' element = {<Userlistprotected><Userlist/></Userlistprotected>}/>
        
        <Route path="/adlogin" element={
          <Adminprotected>
           <Adminlogin/>
          </Adminprotected>
        } />

        
        {/* <Route path="/userlist" element={
          <Adminprotected>
            <Userlist />
          </Adminprotected>
        } /> */}

        

        {/* <Route path='/profile' element={<Profile />} /> */}

      </Routes>
    </Router>
      
    </>
  )
}

export default App
