import { auth } from "~/server/auth";
import { Room } from "~/app/components/liveblocks/Room";

type ParamsType = Promise<{id: string}>;


export default async function Page({params} : {params: ParamsType}) {
    const {id} = await params;

    const session = await auth();

  return(
  <Room roomId={"room" + id}>

    <p>hello</p>
           {/*<Canvas></Canvas>*/}
  </Room>
  )


  
}

//11/12 room 作成　dashbooard config