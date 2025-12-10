"use client";
import { CanvasMode } from "~/types";
import { useState, useRef } from "react";
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
    onClick: (canvasMode: CanvasMode.None) => void;
}){
 const [isOpen, setIsOpen] = useState(false);
 const menuRef = useRef<HTMLDivElement>(null);
 return (
    <div className="relative flex" ref={menuRef}>
        <IconButton isActive={isActive} onClick={()=> onClick(CanvasMode.None)}> 
        {canvasMode !== CanvasMode.None && canvasMode !== CanvasMode.Dragging && <BiPointer className="w-5 h-5"/>}
        {canvasMode === CanvasMode.None && <BiPointer className="w-5 h-5"/>}
        {canvasMode === CanvasMode.Dragging && <FaRegHandPaper className="w-5 h-5"/>}    
        
        </IconButton>

        <button onClick={() => setIsOpen(!isOpen)} className="ml-1 ">
            <svg width="4" height="4" viewBox="0 0 2 2" fill="none">
                <path d="M3.646 6.354l-3-3 .708-.708L4 5.29312.646-2.647-.708-3 3L4 6.707l-.354-.353z" fill="currentColor"/>

            </svg>
        </button>
    </div>
 )
}