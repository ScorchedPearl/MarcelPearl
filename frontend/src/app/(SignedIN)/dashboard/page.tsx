import SideBar from "./_components/SideBar"
import Stats from "./_components/Stats"
export default function Dashboard() {
    return <>
    <div className="h-screen">
        <br />
        <br />
        <div className="h-2/5 w-full grid grid-cols-10 grid-rows-none">
            <div className="col-span-1">

            </div>
            <div className="col-span-2 h-screen">
                <SideBar />
            </div>
            <div className="col-span-6 h-screen">
                <Stats />
            </div>
            <div className="col-span-1">

            </div>
        </div>
        </div>
    
    <div className="h-screen">
        <br /><br />
        hlo
    </div>
    </>
}