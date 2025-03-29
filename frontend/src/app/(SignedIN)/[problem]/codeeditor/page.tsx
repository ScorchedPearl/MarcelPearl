"use client"
import { useState } from "react";
import Code from "./_components/code";
import TestCases from "./_components/OutputPanel";
import ProblemStatement from "./_components/problemStatment";
import { useIsMobile } from "@/hooks/useMobile";
import { Item } from "./types";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
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
 const initialLayoutItem:Item[]=[
  {
   id:1,
   status:"Problem Statement"
  },{
   id:2,
   status:"Code"
  },{
   id:3,
   status:"Test Cases"
  }
 ]
 const [item, setItem] = useState<Item[]>(initialLayoutItem);
 function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) return;

  const itemId = active.id as number;
  const newStatus = over.id as Item['status'];

  setItem(() =>
    item.map((item) =>
      item.id === itemId
        ? {
            ...item,
            status: newStatus,
          }
        : item,
    ),
  );
}

 return (

  !isMobile ? (
   <>
      <DndContext onDragEnd={handleDragEnd}>
    <div className="h-screen grid grid-cols-5 gap-4">
     <div className="col-span-2">
      <ProblemStatement />
     </div>
     <div className="col-span-3 max-h-screen">
      <Code/>
      <TestCases className="flex justify-center" />
     </div>
    </div>
    </DndContext>
   </>
  ) : (
   <>
   <DndContext onDragEnd={handleDragEnd}>
    <div>
     <ProblemStatement />
     <Code/>
     <TestCases className="flex justify-center"/>
    </div>
    </DndContext>
   </>
  )
  
 );
}