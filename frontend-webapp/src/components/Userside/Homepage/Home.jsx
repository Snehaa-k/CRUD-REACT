import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(()=>{
  const token = localStorage.getItem("access_token")
  if (!token){
    navigate('/')
    return
  }})
  return (
    <div>
        <h1>welcome to home page</h1>
        
    </div>
  )
}

export default Home