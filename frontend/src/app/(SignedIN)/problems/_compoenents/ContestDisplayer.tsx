import { User, Calendar, Clock, Trophy, FileText, Tag, ArrowRight } from "lucide-react";
import GridItem from "./Grid";
export default function ContestDisplayer(){
 return<>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-rows-8 w-full h-full ">
     <GridItem
     area="md:[grid-area:1/1/4/3] xl:[grid-area:1/1/4/3]"
     description={<Contest 
contestName="Contest 1"
contestStartDate="2023-10-01"
contestEndDate="2023-10-02"
contestDuration="24 hours"
contestType="Type A"
contestCreator="Creator Name"
      ></Contest>}
      descriptionClassName="h-full w-full"
     />
     <GridItem
     area="md:[grid-area:1/3/4/5] xl:[grid-area:1/3/4/5]"
     description={<Contest 
      contestName="Contest 1"
      contestStartDate="2023-10-01"
      contestEndDate="2023-10-02"
      contestDuration="24 hours"
      contestType="Type A"
      contestCreator="Creator Name"
      contestTheme="red"
            ></Contest>
           }descriptionClassName="h-full w-full"
     />
     <GridItem
     area="md:[grid-area:4/3/7/5] xl:[grid-area:4/3/7/5]"
     description={<Contest 
      contestName="Contest 1"
      contestStartDate="2023-10-01"
      contestEndDate="2023-10-02"
      contestDuration="24 hours"
      contestType="Type A"
      contestCreator="Creator Name"
      contestTheme="teal"
            ></Contest>
           }descriptionClassName="h-full w-full"
     />
     <GridItem
     area="md:[grid-area:4/1/7/3] xl:[grid-area:4/1/7/3]"
     description={<Contest 
      contestName="Contest 1"
      contestStartDate="2023-10-01"
      contestEndDate="2023-10-02"
      contestDuration="24 hours"
      contestType="Type A"
      contestCreator="Creator Name"
      contestTheme="blue"
            ></Contest>
           }descriptionClassName="h-full w-full"
     />
     <GridItem
     area="md:[grid-area:7/1/9/5] xl:[grid-area:7/1/9/5]"
     description="topics"
     />
  </div>
 </>
}
const themeColorMap = {
   amber: {
     from: 'from-amber-400',
     to: 'to-amber-500',
     text: 'text-amber-900',
     bg: 'bg-amber-100',
     icon: 'text-amber-600',
     tag: 'text-amber-500',
     btn: 'bg-amber-500',
     btnHover: 'hover:bg-amber-600',
   },
   red: {
     from: 'from-red-400',
     to: 'to-red-500',
     text: 'text-red-900',
     bg: 'bg-red-100',
     icon: 'text-red-600',
     tag: 'text-red-500',
     btn: 'bg-red-500',
     btnHover: 'hover:bg-red-600',
   },
   blue: {
     from: 'from-blue-400',
     to: 'to-blue-500',
     text: 'text-blue-900',
     bg: 'bg-blue-100',
     icon: 'text-blue-600',
     tag: 'text-blue-500',
     btn: 'bg-blue-500',
     btnHover: 'hover:bg-blue-600',
   },
   teal: {
     from: 'from-teal-400',
     to: 'to-teal-500',
     text: 'text-teal-900',
     bg: 'bg-teal-100',
     icon: 'text-teal-600',
     tag: 'text-teal-500',
     btn: 'bg-teal-500',
     btnHover: 'hover:bg-teal-600',
   },
 };
 
 const Contest = ({
   contestName,
   contestStartDate,
   contestEndDate,
   contestDuration,
   contestType,
   contestCreator,
   contestTheme = "amber",
 }: {
   contestName: string;
   contestStartDate: string;
   contestEndDate: string;
   contestDuration: string;
   contestType: string;
   contestCreator: string;
   contestTheme?: keyof typeof themeColorMap;
 }) => {
   const formatDate = (dateString: string) => {
     return new Date(dateString).toLocaleDateString('en-US', {
       month: 'short',
       day: 'numeric',
     });
   };
 
   const theme = themeColorMap[contestTheme as keyof typeof themeColorMap] || themeColorMap["amber"];
 
   return (
     <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 relative bottom-2">
       <div className={`bg-gradient-to-r ${theme.from} ${theme.to} p-2`}>
         <h2 className="text-md font-bold text-white">{contestName}</h2>
         <div className={`flex items-center space-x-2 ${theme.text}`}>
           <User className="w-3 h-3" />
           <span className="text-xs">Created by {contestCreator}</span>
         </div>
       </div>
 
       <div className="p-3">
         <div className="grid grid-cols-4 gap-1 mb-2">
           {[contestStartDate, contestEndDate].map((date, i) => (
             <div key={i} className="flex items-center space-x-1">
               <div className={`${theme.bg} p-2 rounded-lg`}>
                 <Calendar className={`w-2 h-2 ${theme.icon}`} />
               </div>
               <p className="text-xs font-medium">{formatDate(date)}</p>
             </div>
           ))}
 
           <div className="flex items-center space-x-1">
             <div className={`${theme.bg} p-2 rounded-lg`}>
               <Clock className={`w-2 h-2 ${theme.icon}`} />
             </div>
             <p className="text-xs font-medium">{contestDuration}</p>
           </div>
 
           <div className="flex items-center space-x-1">
             <div className={`${theme.bg} p-2 rounded-lg`}>
               <Trophy className={`w-2 h-2 ${theme.icon}`} />
             </div>
             <p className="text-sm font-medium">{contestType}</p>
           </div>
         </div>
 
         <div className="flex items-center justify-between pt-1 border-t border-gray-100">
           <div className="flex items-center space-x-2">
             <Tag className={`w-3 h-3 ${theme.tag}`} />
             <span className={`text-sm font-medium ${theme.tag}`}>{contestType}</span>
           </div>
           <button
             className={`inline-flex items-center space-x-2 px-3 py-1 ${theme.btn} text-white rounded-lg ${theme.btnHover} transition-colors duration-200`}
           >
             <span>View Details</span>
             <ArrowRight className="w-4 h-4" />
           </button>
         </div>
       </div>
     </div>
   );
 };
 