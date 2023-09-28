import { useRef, useState } from "react"
import { Control, Controller } from "react-hook-form"

import { FormDataType } from "../../types/globalTypes"

type PropsType = {
     control: Control<FormDataType>,
     isLight: boolean,
     placeholder: string,
     fileTypeErrorMsg: string
}

export default function ControlledImagePicker({ control, isLight, placeholder, fileTypeErrorMsg }: PropsType) {

     const imgPickerInput = useRef<HTMLInputElement>(null)

     // trigger click on hidden input[type=file]
     const triggerFileInputElementClick = () => {
          imgPickerInput.current?.click();
     }

     const [error, setError] = useState<string | null>();

     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
               const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
               const selectedFile = event.target.files[0];

               if (allowedFileTypes.includes(selectedFile.type)) {
                    setError(null);
                    return selectedFile;
               }
               else {
                    setError(fileTypeErrorMsg)
               }
          }
     }

     return (
          <Controller
               control={control}
               name='imageFile'
               render={({ field: { onChange, value } }) => (
                    <>
                         <div className={`input flex items-center justify-between cursor-pointer ${isLight ? 'input-lightmode' : 'input-darkmode'}`}
                              onClick={triggerFileInputElementClick}>
                              <input type="file" hidden ref={imgPickerInput} onChange={(event) => onChange(handleFileChange(event))} />

                              <h2 className={`w-[240px] truncate 
                              ${isLight && !value?.name
                                        ? 'text-[#808080] text-[13px]'
                                        : isLight && value?.name
                                             ? 'text-[#0F0E11] text-[14px]'
                                             : !isLight && !value?.name
                                                  ? 'text-[#b5b7ba] text-[13px]'
                                                  : 'text-[#FFFFFF] text-[14px]'
                                   }`}>
                                   {value?.name ?? placeholder}
                              </h2>
                              <svg className={`h-[15px] ${isLight ? 'fill-[#808080]' : 'fill-[#b5b7ba]'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                   <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                   <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                              </svg>
                         </div>

                         {error && <p className="errorMsg">{`${error}`}</p>}
                    </>
               )
               }
          />
     )
}
