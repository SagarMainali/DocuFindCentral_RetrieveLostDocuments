import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../redux/hooks'

import '../styles/side-navbar.css'

export default function SideNavbar() {

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)

     return (
          <div className={`bg-primary-dark overflow-hidden min-h-[100vh] duration-200 drop-shadow-[10px_0_15px_rgba(0,0,0,0.25)] whitespace-nowrap 
          max-md:absolute z-50 ${isMenuOpened ? 'w-[250px]' : 'md:w-[55px] w-0'}`}>

               <header className="h-[60px] flex items-center justify-center text-slate-50 font-medium px-4">
                    <NavLink to='/' className='flex items-center justify-center gap-[6px] group'>
                         <img src="./icons/nav-icons/logo.svg" alt="logo" className='w-[27px] animate-[spin_1s_ease-in-out]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >DocuFind Central</h2>
                    </NavLink>
               </header>

               <div className="text-slate-50 flex flex-col gap-2">

                    <NavLink to="/lost-document" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/lost-doc.svg" alt="lost-doc" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Document lost</h2>
                    </NavLink>

                    <NavLink to="/found-document" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/found-doc.svg" alt="found-doc" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Document found</h2>
                    </NavLink>

                    <NavLink to="/solved-tickets" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/solved-tickets.svg" alt="solved-tickets" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Solved tickets</h2>
                    </NavLink>

                    <NavLink to="/unsolved-tickets" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/unsolved-tickets.svg" alt="unsolved-tickets" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Unsolved tickets</h2>
                    </NavLink>

                    <NavLink to="/great-beings" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/great-beings.svg" alt="great-beings" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Great beings</h2>
                    </NavLink>

                    <NavLink to="/how-it-works" className={({ isActive }) => `navlink flex gap-2 items-center ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/how-it-works.svg" alt="how-it-works" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >How it works</h2>
                    </NavLink>

                    <NavLink to="/feedback" className={({ isActive }) => `navlink flex gap-2 items-center pl-[18px] ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/provide-feedback.svg" alt="provide-feedback" className='w-[22px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Provide feedback</h2>
                    </NavLink>

                    <NavLink to="/privacy-policy" className={({ isActive }) => `navlink flex gap-2 items-center pl-[18px] ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/privacy-policy.svg" alt="privacy-policy" className='w-[20px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >Privacy policy</h2>
                    </NavLink>

                    <NavLink to="/about-us" className={({ isActive }) => `navlink flex gap-2 items-center pl-[20px] ${isActive ? 'navlink-active' : ''}`}>
                         <img src="./icons/nav-icons/about-us.svg" alt="about-us" className='w-[18px]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >About us</h2>
                    </NavLink>

               </div>
          </div>
     )
}
