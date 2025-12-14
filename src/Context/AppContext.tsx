/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import  { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext() ;

export default function AppProvider({children}) {
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState(null);

    // document.documentElement.classList.add("dark")

    useEffect(()=>{
    async function getUser() {
           const res = await fetch("/api/user",{
            headers:{
            Authorization:`Bearer ${token}`
            },
           })
        const data = await res.json();
           return data ;
    }
        const handleUser = async () => {
        if(token) setUser( await getUser())
        }
          handleUser();
    },[token]);

    return (
    <AppContext.Provider value={{token,setToken,user,setUser}}>
{children}
    </AppContext.Provider>
    )
}
