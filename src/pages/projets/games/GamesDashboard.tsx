import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const GamesDashboard = () => {
  const location = useLocation() ;
    let current ; 
  if(location.pathname.includes("tic-tac")){
    current = "tic-tac" ;
  }else if(location.pathname.includes("currency")){
      current = "currency"
  }else current = "crash" ;
  return (
    <div className=' mt-5 shadow-md flex-col flex h-screen justify-between  gap-5'>
      <div className='fixed  flex w-full justify-center top-25 z-10'>
        <ul className='p-4 flex gap-6'>
          <Link to="/projets/games/crash"><button className={`btn border-none  shadow-md hover:shadow-md  hover:shadow-blue-600 hover:translate-y-2 ${current=="crash" ? "bg-orange-500 text-white hover:shadow-orange-500/50" : "hover:bg-white"} `}>Crash </button></Link>
          <Link to="/projets/games/currency-converter"><button className={`btn border-none  shadow-md hover:shadow-md hover:shadow-blue-600 hover:translate-y-2 ${current=="currency" ? "bg-orange-500 text-white hover:shadow-orange-500/50" : "hover:bg-white"}`}>Currency  Converter</button></Link>
          <Link to="/projets/games/tic-tac-toe"><button className={`btn border-none  shadow-md hover:shadow-md hover:shadow-blue-600 hover:translate-y-2 ${current=="tic-tac" ? "bg-orange-500 text-white hover:shadow-orange-500/50" : "hover:bg-white"} `}>Tic-Tac-Toe</button></Link>
        </ul>
      </div>
      <main className='-mt-15'>
        <Outlet/>
      </main>
    </div>
  )
}

export default GamesDashboard
