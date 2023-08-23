import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../redux/hooks'
import '../styles/side-navbar.css'

export default function SideNavbar() {

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)

     return (
          <div className={`bg-primary-dark overflow-hidden duration-300 ${isMenuOpened ? 'w-[240px]' : 'w-[0px]'}`}>
               <header className="h-[60px] w-[240px] flex items-center text-slate-50 font-medium px-4">
                    <NavLink to='/'>Lost Document Finder</NavLink>
               </header>

               <div className="text-slate-50 w-[240px] flex flex-col gap-1">

                    <NavLink to="/" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Document Lost</NavLink>

                    <NavLink to="/b" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Document Found</NavLink>

                    <NavLink to="/c" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>View unsolved tickets</NavLink>

                    <NavLink to="/d" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>View solved tickets</NavLink>

                    <NavLink to="/e" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Great beings</NavLink>

                    <NavLink to="/f" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>How it works</NavLink>

                    <NavLink to="/g" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Privacy Policy</NavLink>

                    <NavLink to="/h" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>About Us</NavLink>

                    <NavLink to="/i" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Provide Feedback</NavLink>

               </div>
          </div>
     )
}
