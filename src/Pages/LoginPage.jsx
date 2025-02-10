
import { useContext, useState } from 'react'
import '../index.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import loginImg from '../../src/assets/login_avatar.png'

import { UserContext } from '../UserContext';
function LoginPage() {
  let [email,setEmail]=useState('');
  let [password,setpassword]=useState('');
  let [redirect,setRedirect]=useState(false);
 let {setUser} =useContext(UserContext);
  let handleLoginSubmit=async (e)=>{
    e.preventDefault();
    try{
    let response=await axios.post('/login',{email,password});
    setUser(response.data)
    console.log(response.data)
    alert('login suceessful');

    setRedirect(true);
    }
    catch{
      alert('login failed')
    }
    
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  // console.log(email,password)
  return (
    <div className="mt-4 grow flex items-center justify-around bg-gray-400 border rounded-2xl">
      <div className='w-2/4 '>
        <img src={loginImg} alt="" className='w-100 border rounded-2xl'/>
      </div>
      <div className='-mt-42 border-none w-2/4 '>
      <h1 className="text-4xl text-center  mb-4">Login</h1>
        <form className="max-w-md mx-auto border-none" onSubmit={handleLoginSubmit}> 
            <input type="email" placeholder="your@email.com"  value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password"  value={password} onChange={e=>setpassword(e.target.value)}/>
            <button className='primary'>Login</button>
            <div className='text-center py-2 text-white'>
              Don't have an account yet?
              <Link to={'/register'} className='underline text-black px-3 '>Register now</Link>
            </div>
        </form>
      </div>
        
    </div>
  )
}

export default LoginPage