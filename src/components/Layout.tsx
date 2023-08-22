import { Outlet } from "react-router-dom"
import SideNavbar from "./SideNavbar"
import TopNavbar from "./TopNavbar"

export default function Layout() {
     return (
          <div className="grid grid-cols-2">
               <SideNavbar />
               <div>
                    <TopNavbar />
                    <Outlet />
               </div>
          </div>
     )
}
