import React from 'react'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
     
     <div className="signup-container mt-10">
    <h2>LOGIN</h2>
    <br/>
    <form >
    
      <div class="mb-3">
        <input type="email" class="form-control" value={username}  onChange={(e)=>{setUsername(e.target.value)}} placeholder= 'Enter Your Email' id="exampleInputEmail1" v-model="email" required/><br/>
      </div>
      <div class="mb-3">
        <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="exampleInputPassword1" placeholder='Enter Your password'  v-model="password" required/>
      </div>
      <button type="submit" className="btn btn-outline-warning">LOGIN</button>
      <button type="submit" className="btn btn-outline-warning m-4">Sign Up</button>
    </form>
  </div>
  
    </div>
  )
}

export default Login