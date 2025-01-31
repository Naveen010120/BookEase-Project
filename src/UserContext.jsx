import axios from "axios";
import { useState,createContext, useEffect } from "react";

export let UserContext=createContext({});
export function UserContextProvider({children}){
    let [user,setUser]=useState(null);
    let [ready,setReady]=useState(false);
    useEffect(()=>{
        if(!user){
           axios.get('/profile').then(({data})=>{
                setReady(true);
               setUser(data);
           });
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser,ready,setReady}}>
        {children}
        </UserContext.Provider>
    )
}