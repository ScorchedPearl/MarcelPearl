import { useProblems } from "@/hooks/useProblem";
import { useContext,useState,createContext, useEffect } from "react";

export interface Problem{
 id:string;
 problemName:string;
 problemStatement:string;
 difficuly:"Easy"|"Medium"|"Hard";
 editorial:string;
 hint:string;
}

interface ProblemContext{
 problems:Problem[];
 isLoading:boolean;
 setProblemsByDifficulty:(difficulty:"Easy"|"Medium"|"Hard")=>void;
 setProblemByTopic:(topic:string)=>void;
 setProblemByTopicAndDifficulty:(topic:string,difficulty:"Easy"|"Medium"|"Hard")=>void;
}
const ProblemContext=createContext<ProblemContext>({
 problems:[],
 isLoading:true,
 setProblemsByDifficulty:(difficulty:"Easy"|"Medium"|"Hard")=>{},
 setProblemByTopic:(topic:string)=>{},
 setProblemByTopicAndDifficulty:(topic:string,difficulty:"Easy"|"Medium"|"Hard")=>{}
})

export function ProblemProvider({children}:{children:React.ReactNode}){
 const {problems:isLoadingProblems,isLoading}=useProblems();
 const [problems,setProblems]=useState<Problem[]>([{
  id: "",
  problemName: "",
  problemStatement: "",
  difficuly: "Easy",
  editorial: "",
  hint: "",
 }]);
 useEffect(()=>{
  if(!isLoadingProblems){
   setProblems(isLoadingProblems);
  }
 },[isLoading,isLoadingProblems])
 const setProblemsByDifficulty=(difficulty:"Easy"|"Medium"|"Hard")=>{
  const problemsByDifficulty=problems.filter((problem)=>problem.difficuly===difficulty);
  setProblems(problemsByDifficulty);
 }
 const setProblemByTopic=(topic:string)=>{
  const problemsByTopic=problems.filter((problem)=>problem.problemName===topic);
  setProblems(problemsByTopic);
 }
 const setProblemByTopicAndDifficulty=(topic:string,difficulty:"Easy"|"Medium"|"Hard")=>{
  const problemsByTopicAndDifficulty=problems.filter((problem)=>problem.problemName===topic && problem.difficuly===difficulty);
  setProblems(problemsByTopicAndDifficulty);
 }
 return(
  <ProblemContext.Provider value={{problems,isLoading,setProblemsByDifficulty,setProblemByTopic,setProblemByTopicAndDifficulty}}>
   {children}
  </ProblemContext.Provider>
 )
}
 export const useProblem=()=>useContext(ProblemContext);