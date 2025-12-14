/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import  { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext() ;

export default function AppProvider({children}) {
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState(null);
   console.log("Token from AppContext:", token);
   const API_URL = import.meta.env.VITE_API_URL;
   console.log("API URL from AppContext:", API_URL);
    useEffect(()=>{
    async function getUser() {
           const res = await toast.promise(fetch(`${import.meta.env.VITE_API_URL}/api/user`,{
            headers:{
            Authorization:`Bearer ${token}`,
             Accept: 'application/json',
            "Content-type": 'application/json'
            },
           }),{
            loading: "Chargement des données...",
            error: "Erreur lors du chargement de l'utilisateur",
           } );

        const data = await res.json();
           return data ;
    }
        const handleUser = async () => {
        if(token) setUser( await getUser())
        }
          handleUser();
    },[token]);

    return (
    <AppContext.Provider value={{token,setToken,user,setUser,API_URL}}>
{children}
    </AppContext.Provider>
    )
}
