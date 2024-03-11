import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleMenu, changeTheme } from "../redux/navbarSlice";

export default function TopNavbar() {

     const isLight = useAppSelector((state) => state.navbar.isLight)

     const dispatch = useAppDispatch()

     const { i18n } = useTranslation()

     function changeLanguage() {
          const currentLng = i18n.language;
          const newLng = currentLng === 'en' ? 'np' : 'en';
          i18n.changeLanguage(newLng, () => {
               localStorage.setItem('language', newLng);
          });
     }

     return (
          <header className={`flex justify-between items-center h-[60px] px-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)] duration-200 select-none
          relative z-40 ${isLight ? 'lightmode' : 'darkmode'}`}>
               <span className="nav-left">
                    <svg onClick={() => dispatch(toggleMenu())}
                         className="fill-white cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg"
                         height="1.2rem"
                         viewBox="0 0 448 512">
                         <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
               </span>

               <div className="nav-right flex items-center gap-5">
                    <span onClick={changeLanguage} className="cursor-pointer">
                         {i18n.language === 'en'
                              ?
                              <span className="flex items-center gap-1">
                                   <img src="./icons/nav-icons/nepal.svg" alt="language-mode-Nepali" className="w-[14px]" />
                                   <h2 className="text-white text-[14px] tracking-wide mt-1">नेपाली</h2>
                              </span>
                              :
                              <span className="flex items-center gap-1">
                                   <img src="./icons/nav-icons/usa.svg" alt="language-mode-English" className="w-[24px]" />
                                   <h2 className="text-white text-[14px]">ENG</h2>
                              </span>
                         }
                    </span>

                    <span onClick={() => dispatch(changeTheme())} className="cursor-pointer">
                         {isLight
                              ?
                              <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width=".9rem" viewBox="0 0 16 16">
                                   <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                              </svg>
                              :
                              <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width=".9rem" viewBox="0 0 16 16">
                                   <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                              </svg>
                         }
                    </span>
               </div>
          </header>
     )
}
