import Calendar from "./_compoenents/Calender";
import ContestDisplayer from "./_compoenents/ContestDisplayer";
import NewFeatures from "./_compoenents/newFeatures";
import ProblemSet from "./_compoenents/ProblemSet";

export default function Problems(){
 return <>
 <div>
   <br /><br />
   <div className="grid grid-cols-13 grid-rows-10 h-screen w-screen ">
    <div className="md:[grid-area:1/1/10/2] xl:[grid-area:1/1/10/2]">
    </div>
    <div className="md:[grid-area:1/2/7/10] xl:[grid-area:1/2/7/10]">
       <ContestDisplayer></ContestDisplayer>
    </div>
    <div  className="md:[grid-area:7/2/11/10] xl:[grid-area:7/2/11/10]">
       <ProblemSet></ProblemSet>
    </div>
    <div  className="md:[grid-area:1/10/7/13] xl:[grid-area:1/10/7/13]">
        <Calendar></Calendar>
    </div>
    <div  className="md:[grid-area:7/10/11/13] xl:[grid-area:7/10/11/13]">  
       <NewFeatures></NewFeatures>
    </div>
    <div  className="md:[grid-area:1/13/10/14] xl:[grid-area:1/13/10/14]">
    </div>
   </div>
   </div>
 </>
}