
export default function TopNavbar() {
     return (
          <header className="flex justify-between items-center h-[50px] bg-[#333A56] px-5">
               <span className="nav-left">
                    <svg className="fill-slate-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1.2rem" viewBox="0 0 448 512">
                         <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
               </span>

               <span className="nav-right flex items-center gap-6">
                    <span className="flex items-center gap-1 cursor-pointer">
                         <img src="nepal.svg" alt="language-mode-Nepali" className="w-[14px]" />
                         <h2 className="text-slate-50 text-[14px] tracking-wide">NEP</h2>
                    </span>

                    {/* <span className="flex items-center gap-1 cursor-pointer">
                         <img src="usa.svg" alt="language-mode-Nepali" className="w-[24px]" />
                         <h2 className="text-slate-50 text-[14px]">ENG</h2>
                    </span> */}

                    <svg className="fill-slate-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1.2rem" viewBox="0 0 16 16">
                         <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>
               </span>
          </header>
     )
}
