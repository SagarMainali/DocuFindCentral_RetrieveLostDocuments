import { Outlet } from "react-router-dom"

import SideNavbar from "./SideNavbar"
import TopNavbar from "./TopNavbar"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { toggleMenu } from "../redux/navbarSlice"

export default function Layout() {

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)

     const dispatch = useAppDispatch()

     return (
          <div className="flex relative">

               <SideNavbar />

               <div className="flex-1 relative" onClick={() => isMenuOpened && dispatch(toggleMenu(false))}>
                    {isMenuOpened && <div className="absolute inset-0 bg-secondary-dark/60 z-10"></div>}
                    <TopNavbar />
                    <Outlet />
               </div>

          </div>
     )
}
