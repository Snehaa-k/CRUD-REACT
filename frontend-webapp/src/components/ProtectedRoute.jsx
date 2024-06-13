// import {Navigate} from "react-router-dom"
// import {jwtDecode} from "jwt-decode"
// import { useNavigate } from "react-router-dom"

// import React, { useState ,useEffect} from 'react'
// import axios from "axios"

// const navigate = useNavigate()
// const ProtectedRoute = ({children}) => {
//   const [isAuthorized,setAuthorized] = useState(null)
//    useEffect(
//     ()=>{
//       auth().catch(() => setAuthorized(false))
//     },[])


//   const refreshToken = async () =>{
//     const refreshToken = localStorage.getItem("refresh_token") 
//     try{
//         const res = await axios.post("http://127.0.0.1:8000/token/refresh/",{
//           refresh: refreshToken,
//         })
//       if (res.status === 200){
//         localStorage.setItem("access_token",res.data.access_token)
//         setAuthorized(true)
//       }else{
//         setAuthorized(false)
//       }
//     }catch(error){
//        console.log(error)
//        setAuthorized(false)
//     }


//   }
//   const auth = async () =>{
//     const token = localStorage.getItem("access_token") 
//     if(!token){
//       setAuthorized(false)
//       return 
//     } 
//     const decoded = jwtDecode(token)
//     const tokenExpiration = decoded.exp
//     const now = Date.now() / 1000

//     if(tokenExpiration<now){
//       await refreshToken()
//     }else{
//       setAuthorized(true)
//     }
//   }

//   if (isAuthorized === null){
      
//   }
 
    
//  return isAuthorized ? children : navigate('/')
// }

// export default ProtectedRoute