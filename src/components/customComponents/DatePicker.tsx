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

     const test = (event: React.ChangeEvent<HTMLInputElement>) => {
          console.log(event)
     }

     return (
          <div className="input" onClick={handleClick}>
               <input type="date" hidden ref={datePickerInput} onClick={test} />
               <h2 className={`w-[240px]  `}>
                    {date?.toString() ?? 'Choose image file'}
               </h2>
          </div>
     )
}
