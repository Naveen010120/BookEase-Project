
import { useState } from 'react';
import '../index.css'
import { Link } from 'react-router-dom'
import registerImg from '../../src/assets/register_avatar.png'
import axios from 'axios';
function RegisterPage() {
  let [name,setName]=useState('');
  let [email,setEmail]=useState('');
  let [password,setpassword]=useState('');
let registerUser=async(e)=>{
  e.preventDefault();    
  try{
    await axios.post('/register',{
      name,
      email,
      password
     })
     alert('registation successful')
  }
  catch{
alert('registation failed. please try again')
  }
 
}
  return (
    <div className="mt-2 grow flex items-center justify-around">
      <div className='-mt-10'>
    <img src={registerImg} alt="" />
      </div>
      <div className='-mt-42 '>
      <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto border " onSubmit={registerUser}> 
            <input type="text" placeholder='Your Name' value={name} onChange={e=>setName(e.target.value)}/>
            <input type="email" placeholder="your@email.com"  value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password}  onChange={e=>setpassword(e.target.value)}/>
            <button className='primary'>Register</button>
            <div className='text-center py-2 text-gray-500'>
             Already a Member?
              <Link to={'/login'} className='underline text-black'>Login</Link>
            </div>
        </form>
      </div>
        
    </div>
  )
}

export default RegisterPage