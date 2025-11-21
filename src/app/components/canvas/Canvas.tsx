"use client";

import { useStorage } from "@liveblocks/react";

export default function Canvas(){
    const roomColor = useStorage((root) => root.roomColor)
    return (
     <div className="flex h-screen w-full">
        <main className="fixed left-0 right-0 h-screen overflow-y-auto">
            <div style={{backgroundColor: roomColor ? rgbToHex(roomColor): "#1e1e1e"
            }}
            className="h-full w-full touch-none"
            >
                
            </div>
        </main>
    </div>
)
}