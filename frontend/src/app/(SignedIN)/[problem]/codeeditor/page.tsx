"use client"
import GridItem from "../../problems/_compoenents/Grid";
import Code from "./_components/code";
import TestCases from "./_components/OutputPanel";
import ProblemStatement from "./_components/problemStatment";
import { useIsMobile } from "@/hooks/useMobile";
export default function CodeEditor() {
 const isMobile = useIsMobile(965);
//  const editorLayout:editorLayout[]=[
//   {
//    id:"Problem Statement",
//    className:"col-span-2"
//   },
//   {
//    id:"Code",
//    className:"col-span-3"
//   },
//   {
//    id:"Test Cases",
//    className:"col-span-3"
//   }
//  ]
//  const initialLayoutItem:Item[]=[
//   {
//    id:1,
//    status:"Problem Statement"
//   },{
//    id:2,
//    status:"Code"
//   },{
//    id:3,
//    status:"Test Cases"
//   }
//  ]
//  const [item, setItem] = useState<Item[]>(initialLayoutItem);
//  function handleDragEnd(event: DragEndEvent) {
//   const { active, over } = event;

//   if (!over) return;

//   const itemId = active.id as number;
//   const newStatus = over.id as Item['status'];

//   setItem(() =>
//     item.map((item) =>
//       item.id === itemId
//         ? {
//             ...item,
//             status: newStatus,
//           }
//         : item,
//     ),
//   );
// }

 return (

  !isMobile ? (
   <>
      <div className="grid grid-cols-10 grid-rows-10 gap-4 h-screen w-screen mt-10 ">
          <GridItem
          area="md:[grid-area:1/1/11/5] xl:[grid-area:1/1/11/5]"
          description={<ProblemStatement></ProblemStatement>}
          descriptionClassName='h-full w-full'
          ></GridItem>
          <GridItem
          area="md:[grid-area:1/5/7/11] xl:[grid-area:1/5/7/11]"
          description={<Code></Code>}
          descriptionClassName='h-full w-full'
          ></GridItem>
          <GridItem
          area="md:[grid-area:7/5/11/11] xl:[grid-area:7/5/11/11]"
          description={<TestCases></TestCases>}
          descriptionClassName='h-full w-full'
          ></GridItem>
      </div>
  
   </>
  ) : (
   <>

   </>
  )
  
 );
}