"use client";
import type {ReactNode} from "react"
import {ClientSideSuspense, LiveblocksProvider , RoomProvider} from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import type { Layer } from "~/types";
export function Room({ children,roomId }: {children: ReactNode, roomId: string} ){
    return (
        <div>
          <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
           <RoomProvider
                    id={roomId}
                    initialPresence={{
                        selection: [],
                        cursor: null,
                        penColor: null,
                        pencilDraft: null
                    }}
                    initialStorage={{
                        roomColor: { r: 30, g: 30, b: 30 },
                        layers: new LiveMap<string, LiveObject<Layer>>(),
                        layerIds: new LiveList([]),
                    }}     
                    >

                        <ClientSideSuspense 
                        fallback={<div className="flex items-center justify-center gap-2 flex-col mt-15"> 
                            <img 
                                src="/favicon.ico" 
                                alt="Figma"  
                                className="h-[50px] w-[50px] animate-bounce"/> 
                                <h1 className="text-sm font-bold">ローデイング
                                </h1>
                                </div>
                            }>
                              {children} 
                        </ClientSideSuspense>
                      
           </RoomProvider>
          </LiveblocksProvider>
        </div>
    )
}