import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../redux/hooks'
import '../styles/side-navbar.css'

export default function SideNavbar() {

     const isMenuOpened = useAppSelector((state) => state.menuToggler)

     return (
          <div className={`bg-primary-dark overflow-hidden duration-300 ${isMenuOpened ? 'w-[240px]' : 'w-[0px]'}`}>
               <header className="h-[60px] w-[240px] flex items-center text-slate-50 font-medium px-4">Lost Document Finder</header>

               <div className="navlinks-container flex flex-col gap-6 text-slate-50 items-start w-[240px] px-4">
                    <div>
                         <h2>Generate a ticket</h2>
                         <hr />
                         <NavLink to="/" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}> I lost Document</NavLink>
                         <NavLink to="/b" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>I found Document</NavLink>
                    </div>
                    <div>
                         <h2>Generated Tickets</h2>
                         <hr />
                         <NavLink to="/c" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>View unsolved tickets</NavLink>
                    </div>
                    <div>
                         <h2>Solved Tickets</h2>
                         <hr />
                         <NavLink to="/d" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>View solved tickets</NavLink>
                    </div>
                    <div>
                         <h2>Appreciation</h2>
                         <hr />
                         <NavLink to="/e" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Great beings</NavLink>
                    </div>
                    <div>
                         <h2>Learn</h2>
                         <hr />
                         <NavLink to="/f" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>How it works</NavLink>
                         <NavLink to="/g" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Privacy Policy</NavLink>
                         <NavLink to="/h" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>About Us</NavLink>
                    </div>
                    <div>
                         <h2>Feedback</h2>
                         <hr />
                         <NavLink to="/i" className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}>Provide Feedback</NavLink>
                    </div>
               </div>
          </div>
     )
}
