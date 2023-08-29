import { useRef } from "react"

type PropsType = {
     date: Date | undefined,
     setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export default function DatePicker({ date, setDate }: PropsType) {

     const datePickerInput = useRef<HTMLInputElement>(null)

     const handleClick = () => {
          datePickerInput.current?.click()
     }

     return (
          <div className="input flex items-center justify-end cursor-pointer" onClick={handleClick}>
               <h2 className={`w-[240px]  `}>
                    {date?.toString() ?? 'Document issued date'}
               </h2>
               <div className="relative overflow-hidden">
                    <svg className="h-[15px] fill-[#808080]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                         <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                         <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <input type="date"
                         className="absolute -top-[3px] -left-[1px] w-[17px] scale-[1.4] focus:border-0 opacity-0"
                         ref={datePickerInput} />
               </div>
          </div>
     )
}
