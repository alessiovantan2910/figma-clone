"Use client";
import type {ReactNode} from "react"
export function Room({ children, roomId }: {children: ReactNode, roomId: string} ){
    return (
        <div>
            <h1>Room: {roomId}</h1>
            {children}
        </div>
    )
}