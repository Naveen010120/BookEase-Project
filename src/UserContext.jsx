import axios from "axios";
import { useState,createContext, useEffect } from "react";

export let UserContext=createContext({});
export function UserContextProvider({children}){
    let [user,setUser]=useState(null);
    let [ready,setReady]=useState(false);
    let [vaildatingData,setVaildatingData]=useState(null)
    useEffect(()=>{
        if(!user){
           axios.get('/profile').then(({data})=>{
                setReady(true);
               setUser(data);
               setVaildatingData(data)
           });
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser,ready,setReady,setVaildatingData,vaildatingData}}>
        {children}
        </UserContext.Provider>
    )
}