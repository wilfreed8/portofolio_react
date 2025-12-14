/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { TerminalDemo2 } from '../terminalDemo';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { SplitText } from "gsap/SplitText";
import MyButton from '../ui/mybutton';


export const Hero = () => { 

    const hero_tl = gsap.timeline({
          delay: 0.2,
          scrub:true,
          }); 
    
       let nameSplit ;
      
        document.fonts.ready.then(() => {
             nameSplit = SplitText.create(".message",
           {
            type: "words" ,
           }); 
              

         hero_tl.from(nameSplit.words,{
         y:-200,
         autoAlpha:0,
         stagger:0.05,
     
         }
        )
         ;

          } 
        );
        

     useGSAP(()=> {

              hero_tl.from(".home div p",{
               y:100,
               x:20,
               opacity:0,
             }).from(".projet",{
                    xPercent:100,
             },"<").from(".home div h2",{
                    yPercent:-300,
                    opacity:0
             })

           hero_tl.to(".full-stack",{
           clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
           ease:"ease.in"
           })
           
           
           hero_tl.to(".data-scientist",{
           clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
           ease:"power1.inOut"
           },"<")
         }
     )
   return ( 
     <section id="home" className="min-h-screen flex items-center justify-center overflow-hidden md:pt-20 pt-20 w-full fixed inset-0 bg-gray-950">
       <div className='flex md:gap-45 text-white'>
       <div className="container home md:mx-20 z-10 flex-2">
         <div className="">
           <h1 className=" message text-center text-5xl md:text-7xl font-bold mb-4">
             <span className="text-gray-50">
               Hi I am Wilfreed
             </span>
           </h1>
           <h2 className="text-2xl space-y-1 md:text-3xl font-medium mb-6 text-gray-300 text-center flex flex-col gap-2">
             Développeur 
             <p className='w-full flex justify-center items-center'>
             <span style={{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}} className="mx-2 full-stack rounded-md p-2 bg-gradient-to-r from-cyan-600 to-indigo-800 text-lg font-semibold text-white">Full-Stack</span> 
             <span style={{clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"}} className="data-scientist rounded-md p-2 bg-gradient-to-r from-indigo-800 to-cyan-600 text-lg font-semibold text-white">Data-Scientist</span>
             </p>
           </h2>
           <p className="text-sm md:text-md md:max-w-2xl text-center mb-8 text-gray-400">
             Passionné par la création d'applications web modernes et performantes , je transforme les idées en expériences numériques exceptionnelles.
           </p>
           <div className="flex flex-col items-center sm:flex-row gap-5 justify-center ">
             <a href="#projects" className=" projet text-white font-medium hover:-translate-y-2 transition-transform duration-300">
               <MyButton text="voir mes projets" className=" cursor-pointer bg-cyan-600 hover:bg-cyan-700"/> 
             </a>
             <a href="#contact" className=" contact px-5 py-3 lg:mt-5 border border-gray-600 text-gray-200 rounded-lg font-medium hover:bg-gray-800 hover:border-cyan-600 transition-all duration-300">
               Me contacter
             </a>
           </div>
         </div>
         <div className="mt-7 flex justify-center space-x-6 lg:mb-12">
           <a href="https://github.com" className="text-gray-500 hover:text-cyan-500 transition-colors">
             <Github size={24} />
           </a>
           <a href="https://linkedin.com" className="text-gray-500 hover:text-cyan-500 transition-colors">
             <Linkedin size={24} />
           </a>
           <a href="mailto:john.doe@example.com" className="text-gray-500 hover:text-cyan-500 transition-colors">
             <Mail size={24} />
           </a>
         </div>
       </div>
       
         <div className=' md:flex-2 hidden md:flex mt-8'>
             <TerminalDemo2 />
         </div>
       </div>
       
       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
         <ChevronDown className="text-2xl text-gray-500" />
       </div>
     </section>
   );
};