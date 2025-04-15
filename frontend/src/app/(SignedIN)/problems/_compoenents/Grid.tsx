import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GridItemProps {
 area: string;
 icon?: React.ReactNode;
 iconClassName?: string;
 title?: string;
 description: React.ReactNode;
 titleClassName?: string;
 descriptionClassName?: string;
}

export default function GridItem({
 area,
 icon,
 iconClassName,
 title,
 description,
 titleClassName,
 descriptionClassName,
}: GridItemProps){
 return (
   <li className={`list-none ${area}`}>
     <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3 border-b-cyan-500">
       {/* <GlowingEffect
         spread={40}
         glow={true}
         disabled={false}
         proximity={64}
         inactiveZone={0.01}
       /> */}
       <div
         className={`relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-0.75 p-3 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-3`}
       >
         <div className="relative flex flex-1 flex-col justify-between gap-2">
          {(icon||title)&&(
            <div className="flex flex-row items-start justify-start gap-3">
            {icon&&(
             <div
             className={`w-fit h-fit rounded-lg border border-teal-400 p-2 ${iconClassName}`}
           >
             {icon}
           </div>
            )}
             {title && (
               <div className="space-y-3">
                 <h3
                   className={`pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white ${titleClassName}`}
                 >
                   {title}
                 </h3>
               </div>
             )}
           </div>
          )}
           <h2
             className={`[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
   md:text-base/[1.375rem] text-black dark:text-neutral-400${descriptionClassName}`}
           >
             {description}
           </h2>
         </div>
       </div>
     </div>
   </li>
 );
};
