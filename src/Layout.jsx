import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout({data,setData}) {

  return (
    <>
    <div className='py-2 px-8 flex flex-col min-h-screen'>
    <Header data={data} setData={setData}/>
    <Outlet />
    </div>
    </>
  )
}

export default Layout