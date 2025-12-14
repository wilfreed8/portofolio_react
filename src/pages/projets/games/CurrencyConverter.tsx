import React from "react";

const { useState, useMemo } = React;
import { useGSAP } from '@gsap/react'
import gsap from 'gsap' ;
export function CurrencyConverter() {
  const goodMapping = [
    {"name" : "USD",
      "value": 1},
    {"name":"EUR",
    "value" : 0.85},
    {"name":"GBP",
    "value": 0.78},
    {"name":"JPY","value": 156.7},
    ];
       
      const [formData,setFormData] = useState({
        start:{"name":"USD","value":1} ,
        target: {"name":"USD","value":1}  , 
        currency:1,
      })
      const result = useMemo(()=> {
        const start = 1/formData.start.value ;
        const val = start*formData.target.value*formData.currency ;
        return(val.toFixed(2));
      },[formData])

            useGSAP(()=>{
                const tl = gsap.timeline(
                  {
                    delay:0.5
                  }
                ) ; 
                 tl.from(".crypto",{
                  xPercent:100,
                  yPercent:100,
                  opacity:0,
                  scale:0,
                  rotate:15
                 })
            })
          
     return (
       <>
       <div className="flex justify-center flex-col mt-16 py-5 items-center w-full ">
       <h1 className="font-bold text-xl mb-4">Currency Converter</h1>
     <div className="crypto bg-white/80 flex flex-col py-7 shadow-md md:w-1/3 px-15  items-center justify-center rounded-2xl">
       <h3 className="mb-2 font-semibold "><span className="text-blue-700">{formData.start.name}</span> to <span className="text-orange-500">{formData.target.name}</span> conversion</h3>
       <form className="flex flex-col space-y-2  w-full">
       <input className="input  shadow-md  outline-none w-full" type="number" value={formData.currency} name="currency" onChange={(e)=>{
         if(e.target.value<0)return ;
         setFormData((prev)=> ({...prev,currency:e.target.value}))}}/>
       <h3 className="font-semibold">Start Currency</h3>
       <select className="shadow-md shadow-blue-500/50 bg-blue-500 text-white w-full outline-none select" onChange={(e) => {
         const val = {
           "name" : e.target.options[e.target.selectedIndex].text,
           "value" : e.target.value
         }
         setFormData((prev) => ({...prev,start:val}))}} >
       {
  goodMapping.map((currency) =>  (
     <option value={currency.value} key={currency.name} >{currency.name}</option>
  ) 
     )
       }
       </select>
       <h3 className="font-semibold">Target Currency</h3>
       <select className="shadow-md shadow-orange-500/40 bg-orange-500 text-white w-full outline-none select" onChange={(e) => {
         const val = {
           "name" : e.target.options[e.target.selectedIndex].text,
           "value" : e.target.value
         }
         setFormData((prev) => ({...prev,target:val}))}} >
       {
  goodMapping.map((currency) =>  (
     <option value={currency.value} key={currency.name} >{currency.name}</option>
  ) 
     )
       }
       </select>
       </form>
       </div>
       <div className="mt-5">
       <h2 className="font-bold text-xl">Converted amount: <span className="text-success">{result}</span> <span className="text-orange-500">{formData.target.name}</span></h2>
       </div>
       </div>
       </>
     )
}