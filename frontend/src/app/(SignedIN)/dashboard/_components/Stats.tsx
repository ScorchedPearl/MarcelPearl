"use client";

import { Box, CheckSquare, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ContestChart } from "./LineChart";
import { ProblemChart } from "./PieChart";
import Badges from "./badges";
import GridItem from "./Griditem";

export default function Stats() {
  return (
    <ul className="h-full grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-12 lg:gap-4  xl:grid-rows-12 mt-3">
      <GridItem
        area="md:[grid-area:1/1/5/7] xl:[grid-area:1/1/5/7]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Contest Stats"
        description={<ContestChart></ContestChart>}
      />

      <GridItem
        area="md:[grid-area:1/7/5/13] xl:[grid-area:5/1/9/7]"
        description={<ProblemChart></ProblemChart>}
      />
      <GridItem
        area="md:[grid-area:5/1/9/7] xl:[grid-area:1/7/5/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Badges"
        description={<Badges></Badges>}
      />

      <GridItem
        area="md:[grid-area:5/7/9/13] xl:[grid-area:5/7/9/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
      <GridItem
        area="md:[grid-area:9/1/12/13] xl:[grid-area:9/1/12/13]"
        icon={<CheckSquare className="h-4 w-4 text-black dark:text-neutral-400"/>}
        description={""}
       />
    </ul>
  );
}

