import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../redux/hooks'

import CustomNavlink from './CustomNavlink'

export default function SideNavbar() {

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)
     const isLight = useAppSelector((state) => state.navbar.isLight)

     return (
          <div className={`overflow-hidden min-h-[100vh] duration-200 drop-shadow-[10px_0_15px_rgba(0,0,0,0.25)] whitespace-nowrap 
          max-md:absolute z-50 ${isMenuOpened ? 'w-[250px]' : 'md:w-[65px] w-0'} ${isLight ? 'bg-primary-dark' : 'dark-mode'}`}>

               <header className="h-[60px] flex items-center justify-center text-slate-50 font-medium px-4">
                    <NavLink to='/' className='flex items-center justify-center gap-[6px] group'>
                         <img src="./icons/nav-icons/logo.svg" alt="logo" className='w-[27px] animate-[spin_1s_ease-in-out]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >DocuFind Central</h2>
                    </NavLink>
               </header>

               <div className="text-slate-50 flex flex-col gap-2">

                    <CustomNavlink path='lost-document' text='Document Lost' />
                    <CustomNavlink path='found-document' text='Document Found' />
                    <CustomNavlink path='unsolved-tickets' text='Unsolved Tickets' />
                    <CustomNavlink path='solved-tickets' text='Solved Tickets' />
                    <CustomNavlink path='great-beings' text='Great Beings' />
                    <CustomNavlink path='how-it-works' text='How It Works' />
                    <CustomNavlink path='feedback' text='Provide Feedback' spacing='pl-[18px]' />
                    <CustomNavlink path='privacy-policy' text='Privacy Policy' spacing='pl-[18px]' width='w-[20px]' />
                    <CustomNavlink path='about-us' text='About Us' spacing='pl-[20px]' width='w-[18px]' />

               </div>
          </div >
     )
}
