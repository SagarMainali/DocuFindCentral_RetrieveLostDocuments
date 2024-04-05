import { Outlet } from "react-router-dom"

import SideNavbar from "../SideNavbar"
import TopNavbar from "../TopNavbar"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { toggleMenu } from "../../redux/navbarSlice"
import Loader from "../Loader"

export default function Layout() {

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)
     const isLight = useAppSelector((state) => state.navbar.isLight)
     const isLoaderActive = useAppSelector((state) => state.loader)

     const dispatch = useAppDispatch()

     return (
          <div className="flex relative max-w-[2000px] mx-auto">

               <SideNavbar />

               <div className="flex-1 relative" onClick={() => isMenuOpened && dispatch(toggleMenu(false))}>

                    {/* add overlay when menu is opened */}
                    {isMenuOpened && <div className={`absolute inset-0 z-20 ${isLight ? 'bg-slate-900/60' : 'bg-black/70'}`}></div>}

                    <TopNavbar />

                    <Outlet />
               </div>

               {/* a loader that covers the entire screen */}
               {
                    isLoaderActive
                    &&
                    <div className={`absolute z-50 h-full w-full flex justify-center items-center ${isLight ? 'bg-slate-500/75' : 'bg-black/50'}`}>
                         <Loader />
                    </div>
               }

          </div>
     )
}
