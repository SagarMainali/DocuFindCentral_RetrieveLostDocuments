import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { toggleMenu } from '../redux/navbarSlice'

import CustomNavlink from './CustomNavlink'

export default function SideNavbar() {

     const { pathname } = useLocation()
     const dispatch = useAppDispatch()

     useEffect(() => {
          dispatch(toggleMenu(false))
     }, [pathname])

     const { t } = useTranslation('sideNavbar_ns') // load sideNavbar namespace

     const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)
     const isLight = useAppSelector((state) => state.navbar.isLight)

     return (
          <div className={`overflow-hidden min-h-[100vh] duration-200 drop-shadow-[10px_0_15px_rgba(0,0,0,0.25)] whitespace-nowrap 
          max-md:absolute z-40 ${isMenuOpened ? 'w-[275px]' : 'md:w-[65px] w-0'} ${isLight ? 'lightmode' : 'darkmode'}`}>

               <header className="h-[60px] flex items-center justify-center text-slate-50 font-medium px-4">
                    <NavLink to='/' className='flex items-center justify-center gap-[6px] group'>
                         <img src="./icons/nav-icons/logo.svg" alt="logo" className='w-[27px] animate-[spin_1s_ease-in-out]' />
                         <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >{t('App Name')}</h2>
                    </NavLink>
               </header>

               <div className="text-slate-50 flex flex-col gap-2">

                    <CustomNavlink path='lost-document' text={t('Document Lost')} />
                    <CustomNavlink path='found-document' text={t('Document Found')} />
                    <CustomNavlink path='unsolved-tickets' text={t('Unsolved Tickets')} />
                    <CustomNavlink path='solved-tickets' text={t('Solved Tickets')} />
                    <CustomNavlink path='great-beings' text={t('Appreciation')} />
                    <CustomNavlink path='how-it-works' text={t('How It Works')} />
                    <CustomNavlink path='feedback' text={t('Feedback')} spacing='pl-[18px]' />
                    <CustomNavlink path='privacy-policy' text={t('Privacy Policy')} spacing='pl-[18px]' width='w-[20px]' />
                    <CustomNavlink path='about-us' text={t('About Us')} spacing='pl-[20px]' width='w-[18px]' />

               </div>
          </div >
     )
}
