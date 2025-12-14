/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ArrowRight, Contact2 } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap' ;
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'

import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact';
import { IconDeviceDesktopCode } from '@tabler/icons-react';
import { FloatingDockDemo } from '@/components/FloatingDockDemo';
import { MobileFloatingDockDemo } from '@/components/Mobile_floating-dock_Demo';
// import Lenis from "lenis";

const Home = () => {
// document.addEventListener("DOMContentLoaded",()=>{
//   const lenis = new Lenis();
//   lenis.on("scroll",ScrollTrigger.update);
//   gsap.ticker.add((time)=>{lenis.raf((time*1000))});
//   gsap.ticker.lagSmoothing(0);
// }); 

useGSAP(() => {
  const tl = gsap.timeline({delay:0.5});
  tl.from(".div2", {
    yPercent: -100,
    opacity: 0,
    scale: 0,
  })
  .from(".span1", { yPercent: 100, opacity: 0 ,filter:"blur(20px)" })
  .from(".span2", { yPercent: 100, opacity: 0,filter:"blur(20px)" })
  .from(".btn1", { yPercent: 100, opacity: 0})
  .from(".btn2", { yPercent: 100, opacity: 0}, "-=0.2");
  
  // const path = document.getElementById("stroke-path");
  // const pathLength = path.getTotalLength();
  // path.style.strokeDasharray = pathLength ;
  // path.style.strokeDashoffset = pathLength ;
  
  // gsap.to(path,{
  //   strokeDashoffset:0,
  //   ease:"none",
  //    scrollTrigger:{
  //     trigger:".main",
  //     start:"top 80%" ,
  //     end:"bottom bottom",
  //     scrub:true,
  //    }
  // });
})

  return (
    <div
      id="home"
      className="div1 flex justify-center flex-col items-center w-full h-full relative overflow-hidden
        text-black dark:text-white"
    >
       <div className="min-h-screen flex flex-col mt-9 md:mt-15 items-center">
        <div
          className="div2 bg-white dark:bg-[#111827] -mt-6 rounded-2xl py-1 px-4 shadow-lg
          group hover:shadow-lg hover:shadow-orange-500 dark:hover:shadow-cyan-500/40"
        >
             <p className="font-medium flex gap-1 font-inter text-black dark:text-slate-200">
              Welcome to my 
              <span className="text-shadow-xs text-orange-500 dark:text-cyan-500">portofolio</span>
              <ArrowRight className="h-5 mt-0.5 group-hover:translate-x-1 transition-all transform"/>
             </p>
        </div>

      <div className="div3 md:mt-5 mt-9 flex justify-center items-center flex-col gap-10 mx-auto">
        <h1 className="md:text-7xl text-[45px] leading-12 font-inter font-semibold text-center mx-auto flex-col flex md:leading-17">
          <span className="span1">
            Data <span>Science</span> and Software
          </span>
          <span className="span2">
            Science <span className="span3">Engineer</span>
          </span>
        </h1>

        <div>
          <div className="flex gap-3">
            <a href="#projects" className="hover:translate-y-1 peer cursor-pointer">
              <button className="btn btn1 border-none bg-orange-500 dark:bg-cyan-500 text-white  rounded-sm shadow-md">
                <IconDeviceDesktopCode/>My Projects
              </button>
            </a>

            <a href="#contact">
              <button
                className="btn btn2 border-none bg-slate-50 text-black dark:text-white
                shadow-md hover:shadow-lg hover:shadow-orange-500 dark:hover:shadow-cyan-500/40 dark:bg-gray-800 hover:bg-white dark:hover:bg-white/20"
              >
                <Contact2/>Contact me
              </button>
            </a>
          </div>
        </div>

        <img
          src="/garcon.png"
          alt="project image"
          className="md:h-100"
        />
      </div>
       </div>

      <main className="main w-full">
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* <div className='absolute svg top-100 -z-1'>
        <svg width="700" height="200%" viewBox="0 0 653 2535" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="stroke-path" d="M307.32 29.3811C307.32 29.3811 51.2941 178.293 54.6443
          332.442C59.3827 550.461 533.691 312.865 577.473
          526.481C626.371 765.065 -5.41653 676.512 39.1642 
          840.045C83.7449 1003.58 541.019 1079.09 582.466 
          1036.58C623.913 994.076 624.673 897.357 607.434 
          810.039C555.403 546.501 -81.8509 983.19 52.6469 
          1215.62C135.265 1358.4 381.225 1424.66 443.145 
          1375.65C505.065 1326.64 595.449 1346.65 564.989 
          1424.66C534.528 1502.68 94.593 1450.17 91.0975
          1585.2C87.602 1720.22 603.439 1659.71 573.977
          1826.74C544.515 1993.78 117.908 1842.6 137.538 
          2029.78C154.012 2186.88 469.839 2083.34 482.095 
          2240.83C492.172 2370.31 280.854 2505.38 280.854 
          2505.38" stroke="#FF8D28" strokeWidth="68"/>
        </svg> 
      </div>*/}

      <div className="fixed items-center flex justify-center bottom-7 z-100">
        <FloatingDockDemo/>
        <MobileFloatingDockDemo/>
      </div>
    </div>
  )
}

export default Home
