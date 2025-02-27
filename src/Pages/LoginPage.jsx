import { useContext, useState } from 'react';
import '../index.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../../src/assets/login_avatar.png';
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';

// Initialize toast notifications
// toast.configure();

function LoginPage() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [redirect, setRedirect] = useState(false);
  let { setUser, setVaildatingData, vaildatingData } = useContext(UserContext);

  let handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('/login', { email, password });
      setVaildatingData(response.data.role);
      setUser(response.data);
      // toast.success('success',{ position: toast.POSITION.TOP_RIGHT })
      alert('login successful')
     

      setRedirect(true);
    } catch (error) {
      // toast.error('Login failed. Please check your credentials.');
      alert('login failed')
    }
    setEmail('');
    setPassword('')
  };

  if (redirect) {
    if (vaildatingData === 'Admin') {
      return <Navigate to={'/account'} />;
    } else if (vaildatingData === 'User') {
      return <Navigate to={'/'} />;
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around rounded-2xl max-[425px]:flex-col">
      <div className='w-2/4 min-[300px]:w-3/4'>
        <img src={loginImg} alt="Login Avatar" className='w-100 border rounded-2xl' />
      </div>
      <div className='-mt-42 border-none w-2/4 min-[300px]:w-3/4 mt-5'>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto border-none" onSubmit={handleLoginSubmit}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-black min-[300px]:text-2'>
            Don't have an account yet?
            <Link to={'/register'} className='underline text-black px-3'>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
