import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { toggleMenu } from "../redux/navbarSlice"

import '../styles/side-navbar.css'

type NavlinkPropTypes = {
    path: string,
    text: string,
    spacing?: string,
    width?: string
}

function CustomNavlink({ path, text, spacing, width }: NavlinkPropTypes) {

    const isMenuOpened = useAppSelector((state) => state.navbar.isMenuOpened)
    const isLight = useAppSelector((state) => state.navbar.isLight)

    const dispatch = useAppDispatch()

    return (
        <NavLink to={`/${path}`} onClick={() => isMenuOpened && dispatch(toggleMenu(false))} //close menu when route changes
            className={({ isActive }) => `navlink flex gap-2 items-center ${spacing ?? ''} 
                         ${isMenuOpened ? '' : 'icon-center'} 
                         ${isActive && isLight
                    ? 'navlink-active-light-bg'
                    : isActive && !isLight
                        ? 'navlink-active-dark-bg'
                        : ''}`}>
            <img src={`./icons/nav-icons/${path}.svg`} className={`${width ?? 'w-[22px]'}`} />
            <h2 className={`text-[17px] overflow-hidden ${isMenuOpened ? '' : 'w-[0px]'}`} >{text}</h2>
        </NavLink>
    )
}

export default CustomNavlink