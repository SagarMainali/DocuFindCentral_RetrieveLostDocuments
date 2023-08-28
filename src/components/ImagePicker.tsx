import { useRef } from "react"

type PropsType = {
     imageFile: File | undefined,
     setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function ImagePicker({ imageFile, setImageFile }: PropsType) {

     const imgPickerInput = useRef<HTMLInputElement>(null)

     const handleClick = () => {
          imgPickerInput.current?.click()
     }

     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files)
               setImageFile(event.target.files[0])
     }

     return (
          <>
               <input type="file" ref={imgPickerInput} placeholder='Document photo' hidden onChange={handleChange} />
               <div className='input flex items-center justify-between cursor-pointer' onClick={handleClick}>
                    <h2 className={`w-[240px] truncate ${imageFile ? 'text-[#1e1e1e]' : 'text-[#808080]'}`}>
                         {imageFile?.name ?? 'Choose image file'}
                    </h2>
                    <svg className="h-[15px] fill-[#808080]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                         <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                         <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
               </div>
          </>
     )
}
