
import { Routes, Route } from 'react-router-dom'
// import './App.css'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

import ProfilePage from './Pages/ProfilePage'
import PlacesPage from './Pages/PlacesPage'
import PlacesFormPage from './Pages/PlacesFormPage'
import PlacePage from './Pages/PlacePage'
import BookingsPage from './Pages/BookingsPage'
import BookingPage from './Pages/BookingPage'
import Header from './Header'
import { useState } from 'react'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {
  let [data,setData]=useState('')
  return (
    <>
      <UserContextProvider>
        {/* <Header data={data} setData={setData}/> */}
        <Routes>
          <Route path='/' element={<Layout data={data} setData={setData} />}>
            <Route index element={<IndexPage  data={data} setData={setData}/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/account' element={<ProfilePage />} />
            <Route path='/account/places' element={<PlacesPage />} />
            <Route path='/account/places/new' element={<PlacesFormPage />} />
            <Route path='/account/places/:id' element={<PlacesFormPage />} />
            <Route path='place/:id' element={<PlacePage />} />
            <Route path='/account/bookings' element={<BookingsPage />} />
            <Route path='/account/bookings/:id' element={<BookingPage />} />
           
          </Route>
        </Routes>
      </UserContextProvider>

    </>
  )
}

export default App