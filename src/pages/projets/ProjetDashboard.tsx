/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {  Outlet, useLocation } from 'react-router-dom'
import { ProjetFloatingDockDemo } from './Projet_floatingDockDemo';
import { MobileProjetFloatingDockDemo } from './Mobile_Projet_floatDockDemo';
import { AppContext } from '@/Context/AppContext';
import { useContext } from 'react';


const ProjetDashboard = () => {
  const {user} = useContext(AppContext)
  const location = useLocation();
  let current ;
  if(location.pathname.includes("projets")) {
   current = "todo Lists" ;
  }
  if(user?.email=="hackman@gmail.com" && location.pathname.includes("myemails")){
    current = "myemails" ;
  }
  if(location.pathname.includes("games")){
        current ="games" ;
  }
  return (
    <div className="flex justify-center items-center flex-col w-full">
    <div className='items-center flex justify-center w-full '>
     <h3 className="md:text-3xl text-2xl md:left-8 left-4 top-22 md:-mb-8 absolute font-semibold first-letter:uppercase">{current}</h3>
    </div>
    {
      current=="todo Lists" && (<>
    <svg className='w-100 -z-1 fixed top-15 right-1 '  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0F62FE" d="M46.8,-60.4C55.4,-48.6,53.4,-28.8,56.5,-10.1C59.6,8.6,67.7,26.2,63,38.3C58.3,50.4,40.7,56.9,25.1,57.6C9.6,58.3,-3.9,53.1,-17.8,48.3C-31.6,43.5,-45.8,39.1,-51,29.6C-56.2,20.2,-52.4,5.8,-49.3,-8.2C-46.2,-22.1,-43.8,-35.7,-35.7,-47.7C-27.6,-59.6,-13.8,-70,2.7,-73.1C19.1,-76.3,38.2,-72.3,46.8,-60.4Z" transform="translate(100 100)" />
   </svg>
    <svg className='w-100 -z-1 fixed  -bottom-25  -left-20'  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0F62FE" d="M46.8,-60.4C55.4,-48.6,53.4,-28.8,56.5,-10.1C59.6,8.6,67.7,26.2,63,38.3C58.3,50.4,40.7,56.9,25.1,57.6C9.6,58.3,-3.9,53.1,-17.8,48.3C-31.6,43.5,-45.8,39.1,-51,29.6C-56.2,20.2,-52.4,5.8,-49.3,-8.2C-46.2,-22.1,-43.8,-35.7,-35.7,-47.7C-27.6,-59.6,-13.8,-70,2.7,-73.1C19.1,-76.3,38.2,-72.3,46.8,-60.4Z" transform="translate(100 100)" />
   </svg>
      </>
      )
    }
    <main className='w-full min-h-screen shadow-none border-none pt-10'>
        <Outlet/>
    </main>
    <div className="fixed items-center flex justify-center bottom-7 z-100">
              <ProjetFloatingDockDemo/>
              <MobileProjetFloatingDockDemo/>
            </div>
    </div>
  )
}

export default ProjetDashboard
