import { useAppSelector } from '../redux/hooks'

export default function SideNavbar() {

     const isMenuOpened = useAppSelector((state) => state.menuToggler)

     return (
          <div className={`duration-300 ${isMenuOpened ? 'w-[250px]' : 'w-[0px]'}`}>
               <header className="h-[50px] flex justify-center items-center bg-[#333A56] text-slate-50">Lost Document Finder</header>
          </div>
     )
}
