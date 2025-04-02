import {Link} from "react-router-dom";
import {Children, createContext, useContext, useState} from "react";
import {UserContext} from "./UserContext.jsx";
import bookease from './assets/BookEase.png'
import { selectedValueShare } from "./App.jsx";



export default function Header({children,data,setData}) {
  const {user} = useContext(UserContext);
  const {selectedValue, setSelectedValue} = useContext(selectedValueShare)
 
  let handleDropDown=()=>{
    setDropDown(true)
  }


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // console.log("Selected Value:", event.target.value);  // For debugging
  };
 

  return (
    <>
    <header className="flex justify-between">
        <div className="w-20">

      <Link to={'/'} >
        <img src={bookease} alt="" className="w-100%" />
       
      </Link>
      
        </div>
      <div className="flex gap-2 border border-gray-300 rounded-full items-center py-2  px-6 shadow-md shadow-gray-300">
        <Link to={'/'} className="cursor">Home</Link>
        <div className="border-l border-gray-300"></div>
        |
        <div className="relative">
        <select
          className="px-4 py-2 rounded-lg bg-white text-gray-800 border-none   focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
          value={selectedValue}
          onChange={handleChange}>
          <option value="Price" >Price</option>
          <option value="9999">5000₹ - 9999₹</option>
          <option value="19999">10000₹ - 19999₹</option>
          <option value="">20000₹ & More</option>
        </select>
      </div>
            
        <div className="border-l border-gray-300"></div>
        |
        <input type="text" value={data} onChange={e=>setData(e.target.value)} placeholder="Search...."/>
        <button className="bg-primary text-white p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      {/* drop down list */}
      <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-4 px-4 " onClick={handleDropDown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
       
        {!!user && (
          <div className="font-black">
            {user.name[0].toUpperCase()}
          </div>
        )?(
          <div className="font-black"> 
          {user.name[0].toUpperCase()}
        </div>
        ):(
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        )}
      </Link>
      
    
    </header>
     
    </>
  );
}