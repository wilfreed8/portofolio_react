/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useMemo, useState } from "react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap' ;
export function TicToe() {
  const [value, setValue] = useState(false);
  const current = React.useMemo(() => (value ? "X" : "O"), [value]);

  const [board, setBoard] = React.useState(Array(9).fill(null));
  const handleReset = () => {
    const newBoard = Array(9).fill(null) ; 
    setBoard(newBoard) ;
  }
  const draw = useMemo(() => {
  // s’il y a une case vide → PAS match nul
  if (board.filter(cell => cell === null).length>1) return false;
  return true;
}, [board]);

  const result = useMemo(() => {
  // lignes 
  for (let i = 0; i < 3; i++) {
    const a = board[i * 3];
    const b = board[i * 3 + 1];
    const c = board[i * 3 + 2];
    if (a && a === b && b === c) return a;
  }

  // colonnes
  for (let i = 0; i < 3; i++) {
    const a = board[i];
    const b = board[i + 3];
    const c = board[i + 6];
    if (a && a === b && b === c) return a;
  }

  // diagonales
  if (board[0] && board[0] === board[4] && board[4] === board[8]) {
    return board[0];
  }

  if (board[2] && board[2] === board[4] && board[4] === board[6]) {
    return board[2];
  }

  return null; // pas de gagnant
}, [board]);
  const handleClick = (index:number) => {
    // éviter d’écraser une case déjà jouée
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = current;
    setBoard(newBoard);

    // changer de j
    setValue(!value);
  };

  useGSAP(()=>{
         const tl = gsap.timeline({
          delay:1
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
    <div className="square bg-info md:w-1/3 mx-5 md:mx-auto mt-20 rounded-md py-5 items-center justify-center  flex flex-col">
      <h1 className="text-center font-bold text-2xl  mb-5">Tic Tac Toe</h1>
      {result &&  (<div className="text-center "><p className="text-white mx-5 md:mx-0 alert text-center flex justify-center md:text-2xl text-md alert-success mb-5">Nous avons un gagants le joueur {result} felicitations🎉🎉🎈</p></div>)}
      {draw && !result && (<div className="text-center "><p className="text-white alert mx-5 md:mx-0 text-center flex justify-center md:text-2xl text-md alert-info mb-5">Nous avons un match nulle felicitations a tous les deux🎊🎊🎊🎊</p></div>)}
      <div className="w-50  justify-center text-center flex "> 
      <div className=" buttons grid grid-cols-3 gap-1.5 justify-center ">
      {board.map((cell, i) => (
        <button key={i} onClick={() => handleClick(i)} disabled={result} className={`btn border-none bg-base-300 shadow-md w-15 text-2xl text-green-300 font-bold ${board[i]=="X" && board[i]!=null ? "text-red-500" : "text-green-400"}`}>
          {cell}
        </button>
      ))}
      </div>
      </div>
      <button onClick={handleReset} className="btn border text-white  mt-10 btn-error">Reset</button>
    </div>
  );
}
