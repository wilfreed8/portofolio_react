import React, { useMemo, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap' ;
function Crash() {
      const [board,setBoard] = useState(Array(16).fill(null)); 
      const [line,setLine] = useState(4) ;
      const [isPlaying,setIsPlaying] = useState(true)

      const FillBoard = () => {
            const firstValue =     Math.floor(Math.random()*4) +1 ;
            let secondVlaue =    Math.floor(Math.random()*4) +1 ;
            let thirdValue = Math.floor(Math.random()*4) +1 ;
            while(firstValue==secondVlaue || thirdValue==secondVlaue || firstValue==thirdValue){
             secondVlaue = Math.floor(Math.random()*4) +1 ;
             thirdValue = Math.floor(Math.random()*4) +1 ;
            }
            const newindex = 4*line - 5 ;
            const temp = [...board] ;
              temp.forEach((_,index)=> { if(index>newindex && temp[index]==null) temp[index]=true});
            
            if( line==1){
             temp[newindex+firstValue]=false;
             temp[newindex+secondVlaue]=false ;
//niveau difficile derriere ligne avec probabilite 1/4
             //temp[newindex+thirdValue]=false ;
             return temp ;
            }  
             if(line<=2) {
             temp[newindex+firstValue]=false;
             temp[newindex+secondVlaue]=false ;
             return temp ;
            }
            else {
             temp[newindex+firstValue]=false ; 
             return temp ;
            }  
      } ;

       const handleClick = (i:number) => {
        const newindex = 4*line - 5 ;
        if (board[i] !== null || i<=newindex || !isPlaying ) return;
        const temp = FillBoard() ;
         setBoard(temp);
           console.log(board);
           console.log(line);
          if(!temp[i]) setIsPlaying(false) ;
            setLine(line-1) ;
      }

  const handleReset = () => {
        setBoard(Array(16).fill(null));
        setIsPlaying(true);
        setLine(4);
  }
      useGSAP(()=>{
         const tl = gsap.timeline({
         })
         const btns = gsap.utils.toArray(".buttons button");
         btns.forEach(btn => {
          tl.from(btn,{
            xPercent: 100 + 20*Math.random()*100,
            yPercent: 100 + 10*Math.random()*100,
            scale:Math.random(),
            opacity:0,
          },"-=0.35")
          
         });
      })
  return (
    <div className='flex bg-info mt-23 md:w-1/3 md:mx-auto rounded-md mx-5 items-center justify-center flex-col'>
      <h1 className='text-4xl font-semibold mt-5 text-gray-800'>Jeux de Crash</h1>
      {!isPlaying && <span className=' alert  border-none bg-error text-white font-semibold justify-center text-xl z-1'>Desole vous avez perdu</span>}
      {isPlaying && line==0 && <span className=' alert border-none text-lg mt-5 bg-success text-white z-1'>Feliciations vous avez gagnez la partie</span>}
      <div className='mt-3'>
        <div className="buttons grid grid-cols-4 gap-2 items-center justify-center">
         {
            board.map((_,index) => (
                <button className='btn border-none bg-base-300 shadow-md w-15 text-3xl' key={index} disabled={!isPlaying && line>1} onClick={()=>handleClick(index)}>{board[index]==null ? "" :  board[index] ? "💚" : "💔"}</button>
            ))
         }
        </div>
      </div>
      <button onClick={handleReset} className="btn border my-5 btn-error text-white font-bold">Reset</button>
    </div>
  )
}

export default Crash
