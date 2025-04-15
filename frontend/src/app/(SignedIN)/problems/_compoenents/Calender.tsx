"use client"
import { GetServerSideProps } from 'next';
import GridItem from './Grid';
import { useState } from 'react';
import {  Check, ChevronLeft, ChevronRight, Flame, Target, Trophy } from 'lucide-react';

const Calendar = () => {
 return (
  <div className='grid grid-cols-1 grid-rows-12 h-[100%] w-full ml-3'>
   <GridItem
     area="md:[grid-area:1/1/4/2] xl:[grid-area:1/1/4/2]"
     description={<StreakCard stats={{ currentStreak: 5, longestStreak: 10, totalDays: 20, targetDays: 30 }} />}
     descriptionClassName='h-full w-full'
     />
   <GridItem
     area="md:[grid-area:4/1/13/2] xl:[grid-area:4/1/13/2]"
     description={<CalendarSkeleton></CalendarSkeleton>}
     descriptionClassName='h-full w-full'
   >
   </GridItem>
  </div>
 );
}

interface CalendarProps {
 onDateSelect?: (date: Date) => void;
}
interface StreakStats {
 currentStreak: number;
 longestStreak: number;
 totalDays: number;
 targetDays: number;
}

const StreakCard: React.FC<{ stats: StreakStats }> = ({ stats }) => {
 return (
   <div className="bg-white rounded-xl shadow-lg p-3 max-w-md mx-auto mb-4">
     <div className="flex items-center justify-between mb-2">
       <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2">
         <Flame className="w-4 h-4 text-orange-500" />
         Your Streak
       </h2>
       <div className="bg-orange-100 text-orange-600 px-2 rounded-full text-sm font-medium">
         {stats.currentStreak} days
       </div>
     </div>
     <div className="mt-1">
       <div className="flex items-center justify-between mb-1">
         <div className="flex items-center gap-1">
           <Target className="w-3 h-3 text-purple-500" />
           <span className="text-xs font-medium text-gray-600">Target Progress</span>
         </div>
         <span className="text-xs text-gray-500">{stats.totalDays}/{stats.targetDays} days</span>
       </div>
       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
         <div 
           className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
           style={{ width: `${(stats.totalDays / stats.targetDays) * 100}%` }}
         />
       </div>
     </div>
   </div>
 );
};
const CalendarSkeleton: React.FC<CalendarProps> = ({ onDateSelect }) => {
 const [currentDate, setCurrentDate] = useState(new Date());
 const [selectedDates, setSelectedDates] = useState<Date[]>([]);

 const months = [
   "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
 ];

 const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 const getDaysInMonth = (date: Date) => {
   return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
 };

 const getFirstDayOfMonth = (date: Date) => {
   return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
 };

 const handleDateClick = (day: number) => {
   const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
   const dateExists = selectedDates.some(date => 
     date.getDate() === newDate.getDate() &&
     date.getMonth() === newDate.getMonth() &&
     date.getFullYear() === newDate.getFullYear()
   );

   if (dateExists) {
     setSelectedDates(selectedDates.filter(date => 
       !(date.getDate() === newDate.getDate() &&
         date.getMonth() === newDate.getMonth() &&
         date.getFullYear() === newDate.getFullYear())
     ));
   } else {
     setSelectedDates([...selectedDates, newDate]);
   }

   onDateSelect?.(newDate);
 };

 const isDateSelected = (day: number) => {
   return selectedDates.some(date => 
     date.getDate() === day &&
     date.getMonth() === currentDate.getMonth() &&
     date.getFullYear() === currentDate.getFullYear()
   );
 };

 const changeMonth = (increment: number) => {
   setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
 };

 const renderCalendarDays = () => {
   const daysInMonth = getDaysInMonth(currentDate);
   const firstDay = getFirstDayOfMonth(currentDate);
   const days = [];

   for (let i = 0; i < firstDay; i++) {
     days.push(
       <div key={`empty-${i}`} className="h-10 border border-transparent" />
     );
   }

   for (let day = 1; day <= daysInMonth; day++) {
     const isSelected = isDateSelected(day);
     days.push(
       <button
         key={day}
         onClick={() => handleDateClick(day)}
         className={`relative h-10 border border-transparent rounded-lg transition-all duration-300 hover:border-blue-500 
           ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'}`}
       >
         <span className="absolute top-1 left-1 text-sm">{day}</span>
         {isSelected && (
           <Check className="absolute bottom-1 right-1 w-4 h-4 text-white" />
         )}
       </button>
     );
   }

   return days;
 };

 return (
   <div className="bg-white rounded-xl shadow-lg p-3 max-w-md mx-auto">
     <div className="flex items-center justify-between mb-2">
       <button
         onClick={() => changeMonth(-1)}
         className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
       >
         <ChevronLeft className="w-5 h-5 text-gray-600" />
       </button>
       <h2 className="text-xl font-semibold text-gray-800">
         {months[currentDate.getMonth()]} {currentDate.getFullYear()}
       </h2>
       <button
         onClick={() => changeMonth(1)}
         className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
       >
         <ChevronRight className="w-5 h-5 text-gray-600" />
       </button>
     </div>

     <div className="grid grid-cols-7 gap-1 mb-2">
       {daysOfWeek.map(day => (
         <div key={day} className="text-center text-sm font-medium text-gray-500">
           {day}
         </div>
       ))}
     </div>

     <div className="grid grid-cols-7 gap-1">
       {renderCalendarDays()}
     </div>
   </div>
 );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {


 return {
  props:{
    
  }
 }
}

export default Calendar