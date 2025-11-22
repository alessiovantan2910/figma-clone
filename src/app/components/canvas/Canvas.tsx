"use client";
import { nanoid } from "nanoid"
import { useMutation, useStorage } from "@liveblocks/react";
import { pointerEventToCanvasPoint, rgbToHex } from "~/utils";
import  LayerComponent  from "./LayerComponent";
import { LayerType, type RectangleLayer, type Layer, type Point, type Camera } from "~/types";
import { LiveObject } from "@liveblocks/client";
import { useEffect, useState } from "react";


const MAX_LAYERS = 100;

export default function Canvas(){
    const roomColor = useStorage((root) => root.roomColor);
    const layerIds = useStorage((root) => root.layerIds);
    const [camera, setCamera] = useState<Camera>({x:0, y:0, zoom:1})

    const insertLayer = useMutation((
        {storage, setMyPresence}, 
        layerType: LayerType.Ellipse | LayerType.Rectangle |  LayerType.Text,
        position: Point,
    )=> {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS){
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid()
        let layer  : LiveObject<Layer> | null = null;

        if(layerType === LayerType.Rectangle){
            layer = new LiveObject<RectangleLayer>({
            type : LayerType.Rectangle,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: {r:217 , g:217 , b:217},
            stroke: {r:217 , g:217 , b:217},
            opacity: 100
            })
        }
        if (layer){
            liveLayerIds.push(layerId);
            liveLayers.set(layerId, layer);

            setMyPresence({selection: [layerId]}, {addToHistory:true})

        }
    },
    [],
)


const onPointerUp = useMutation(({} ,e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint( e, camera);

    insertLayer(LayerType.Rectangle, point)
}, [])


    return (
     <div className="flex h-screen w-full">
        <main className="fixed left-0 right-0 h-screen overflow-y-auto">
            <div style={{backgroundColor: roomColor ? rgbToHex(roomColor): "#1e1e1e"
            }}
            className="h-full w-full touch-none"
            >
                <svg onPointerUp={onPointerUp} className="h-full w-full touch-none">
                    <g>

                        {layerIds?.map(layerId => (
                            <LayerComponent key={layerId} id={layerId}/>))}
                    </g>
                </svg>
            </div>
        </main>
    </div>
)
}