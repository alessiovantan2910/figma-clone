"use client";
import { CanvasMode } from "~/types";
import { useState, useRef, useEffect } from "react";
import IconButton from "./IconButton";
import { BiPointer  } from "react-icons/bi"
import {  FaRegHandPaper } from "react-icons/fa";

export default function selectionButton({
    isActive,
     canvasMode,
     onClick
    } : {
    isActive: boolean; 
    canvasMode: CanvasMode;
    onClick: (canvasMode: CanvasMode.None | CanvasMode.Dragging) => void;
}){
 const [isOpen, setIsOpen] = useState(false);
 const menuRef = useRef<HTMLDivElement>(null);

 useEffect( () => {
 const handleClickOutside = (event: MouseEvent) => {
    if(menuRef.current && !menuRef.current.contains(event.target as Node)){
        setIsOpen(false)
    }
 }
       document.addEventListener("mousedown", handleClickOutside);
       return () =>
        document.removeEventListener("mousedown", handleClickOutside);
 
 }, [])

 const handleClick = (canvasMode: CanvasMode.None | CanvasMode.Dragging ) => {
  onClick(canvasMode);
  setIsOpen(false)
}
 return (
    <div className="relative flex" ref={menuRef}>
        <IconButton isActive={isActive} onClick={()=> onClick(CanvasMode.None)}> 
        {canvasMode !== CanvasMode.None &&
         canvasMode !== CanvasMode.Dragging && (
         <BiPointer className="w-5 h-5"/>
         )}
        {canvasMode === CanvasMode.None && <BiPointer className="w-5 h-5"/>}
        {canvasMode === CanvasMode.Dragging && <FaRegHandPaper className="w-5 h-5"/>}    
        
        </IconButton>

        <button onClick={() => setIsOpen(!isOpen)} className="ml-1 ">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
            d="M3.646 6.354l-3-3 .708-.708L4 5.293l2.646-2.647.708.708-3 3L4 6.707l-.354-.353z"
            fill="currentColor"
          />
            </svg>
        </button>
        {isOpen && (
        <div className="min-w-[150px] absolute -top-20 mt-1 rounded-xl bg-[#1e1e1e] p-2 shadow-lg">
            <button className={`flex w-full items-center rounded-md p-1 texr-white hover:bg-blue-500 ${canvasMode === CanvasMode.None ? "bg-blue-600": ""}`} 
            onClick={() => handleClick(CanvasMode.None)}>
                <span className="w-5 text-sm ">
                    {canvasMode === CanvasMode.None}
                </span>
                <BiPointer className="mr-2 h-4 w-4"/>
                <span className="text-xs ">Move</span>
            </button>
            <button
           className={`flex w-full items-center rounded-md p-1 texr-white hover:bg-blue-500 ${canvasMode === CanvasMode.Dragging ? "bg-blue-600": ""}`} 
            onClick={() => handleClick(CanvasMode.Dragging)}
            >
                 <span className="w-5 text-sm ">
                    {canvasMode === CanvasMode.Dragging }
                </span>
               <FaRegHandPaper className=" mr-2 w-3.5 h-3.5"/>
                <span className="text-xs ">Hand tool</span>
            </button>
        </div>
        )}
    </div>
 )
}