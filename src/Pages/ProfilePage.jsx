import  { useContext, useState } from 'react';
import {UserContext} from '../UserContext';
import {Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from './AccountNavigation';

function ProfilePage() {
  let {subpage}=useParams();
  let [redirect,setRedirect]=useState(false);
  let {ready,user,setUser,setReady}=useContext(UserContext);
  if(subpage==undefined){
    subpage='profile'
  }

 async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if(!ready){
    return 'Loading..'
  }
  if(ready && !user && !redirect){
    return <Navigate to={'/login'}/>
  }

 
  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
   <div>
    <AccountNavigation />
    {subpage==='profile' &&(
      <div className='text-center  max-w-lg mx-auto '>
        Logged in as {user.name} ({user.email}) <br />
        <button onClick={logout} className='primary max-w-sm  mt-2'>Logout</button>
      </div>
    )}
    {subpage=='places' &&(
      <PlacesPage />
    )}
    
    
   </div> 
  )
}

export default ProfilePage