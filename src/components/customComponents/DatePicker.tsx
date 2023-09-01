import { DatesType } from '../UserForm'

type PropsType = {
     date: string | undefined,
     setDates: React.Dispatch<React.SetStateAction<DatesType>>,
     name: string,
     placeholder: string
}

export default function DatePicker({ date, setDates, name, placeholder }: PropsType) {

     const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target
          setDates(prevState => ({
               ...prevState,
               [name]: value
          }))
     }

     return (
          <div className="input flex items-center justify-between cursor-pointer">
               <h2 className={`w-[240px]  `}>
                    {date ?? placeholder}
               </h2>
               <div className="relative overflow-hidden">
                    <svg className="h-[15px] fill-[#808080]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                         <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                         <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <input type="date"
                         name={name}
                         // overlaying the actual calendar icon on top and reducing the opacity to 0 while still keeping its functionality there
                         className="absolute -top-[3px] -left-[1px] w-[17px] scale-[1.4] focus:border-0 opacity-0"
                         onChange={handleDateChange}
                    />
               </div>
          </div>
     )
}
