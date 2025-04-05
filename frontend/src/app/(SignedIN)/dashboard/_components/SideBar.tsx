import { Box } from "lucide-react";
import GridItem from "./Griditem";
import MainSidebar from "./MainSidebar";

export default function SideBar() {
  return<>
    <ul className="grid grid-cols-1 grid-rows-1 relative  top-2.5 right-5  h-full gap-4 md:grid-cols-1 md:grid-rows-1 lg:gap-4 xl:grid-rows-1">
     <GridItem 
      area="md:[grid-area:1/1/1/1] xl:[grid-area:1/1/1/1]"
      icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
      title="profile"
      description={<><MainSidebar></MainSidebar></>}
     />
    </ul>
  </>

}
