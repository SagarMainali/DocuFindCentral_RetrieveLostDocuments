import { Outlet } from "react-router-dom"
import SideNavbar from "./SideNavbar"
import TopNavbar from "./TopNavbar"

export default function Layout() {
     return (
          <div className="flex">
               <SideNavbar />
               <div className="flex-1">
                    <TopNavbar />
                    <Outlet />
               </div>
          </div>
     )
}
