import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Userlogin from './pages/Userside/Userlogin'
import Usersignup from './pages/Userside/Usersignup'
import './App.css'
import Profile from './components/Userside/Userprofile/Profile'
import Userhome from './pages/Userside/Userhome'


function App() {
  
  

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Userlogin />} />
        <Route path='/signup' element={<Usersignup />} />
        <Route path='/home' element={<Userhome/>}/>

        {/* <Route path='/profile' element={<Profile />} /> */}

      </Routes>
    </Router>
      
    </>
  )
}

export default App
