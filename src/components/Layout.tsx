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

               <div className="flex-1" onClick={() => isMenuOpened && dispatch(toggleMenu())}>
                    <TopNavbar />
                    <Outlet />
               </div>

          </div>
     )
}
