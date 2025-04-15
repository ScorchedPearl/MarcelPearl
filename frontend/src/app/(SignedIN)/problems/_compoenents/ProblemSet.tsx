import { Input } from "@/components/ui/input";
import GridItem from "./Grid";
import { MoveVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProblemSet(){
   return <>
     <div className="grid grid-cols-1 grid-rows-1 h-[90%] w-full mt-3">
        <GridItem
        area="md:[grid-area:1/1/2/2] xl:[grid-area:1/1/2/2]"
        description={<Problems></Problems>}/>
     </div>
   </>
}

const Problems=()=>{
   return<>
      <div>
         <div className="w-full h-[10%] flex flex-row p-1 ">
            <Input placeholder="Search Questions" width={300} className="text-white p-2 border-3 border-cyan-400 "></Input>
            <Button className="mx-4 bg-cyan-600 text-white"><MoveVertical></MoveVertical></Button>
         </div>
      </div>
   </>
}