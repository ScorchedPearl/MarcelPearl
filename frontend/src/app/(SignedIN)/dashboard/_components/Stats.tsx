"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ContestChart } from "./LineChart";
import { ProblemChart } from "./PieChart";
import Badges from "./badges";

export default function Stats() {
  return (
    <ul className="h-full grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 mt-3">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Contest Stats"
        description={<ContestChart></ContestChart>}
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/7]"
        description={<ProblemChart></ProblemChart>}
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/7/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Badges"
        description={<Badges></Badges>}
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  title?: string;
  description: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

const GridItem = ({
  area,
  icon,
  iconClassName,
  title,
  description,
  titleClassName,
  descriptionClassName,
}: GridItemProps) => {
  return (
    <li className={`list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3 border-b-cyan-500">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className={`relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-0.75 p-3 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-3 bg-gradient-to-tr from-teal-950 via-cyan-900 to-black`}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
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
    md:text-base/[1.375rem] text-black dark:text-neutral-400 ${descriptionClassName}`}
            >
              {description}
            </h2>
          </div>
        </div>
      </div>
    </li>
  );
};
