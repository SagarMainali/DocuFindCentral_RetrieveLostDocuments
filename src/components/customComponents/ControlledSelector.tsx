import Select from 'react-select'
import { Control, Controller } from 'react-hook-form'

import { FormDataType } from '../../types/globalTypes'

type PropsType = {
     // an object that contains methods to link useForm and the Component where it is being used
     control: Control<FormDataType>,
     inputName: string,
     placeholder: string,
     options: {
          value: string,
          label: string
     }[],
     requiredErrorMsg: string,
     noOptionsMessage?: string,
     isLight: boolean
}

export default function ControlledSelector({ control, inputName, placeholder, options, requiredErrorMsg, noOptionsMessage, isLight }: PropsType) {

     const fontSize = '13px'

     return (
          // use Controller from react-hook-form to wrap external UI component(library) in order to build a connection
          <Controller
               control={control}
               name={inputName}
               rules={{
                    required: requiredErrorMsg
               }}
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <div>
                         <Select
                              options={options}
                              value={options.find((option) => option.value === value) || null} //return null if no match is found
                              onChange={(selectedOption) => onChange(selectedOption?.value)}
                              placeholder={placeholder}
                              isSearchable={noOptionsMessage ? true : false}
                              noOptionsMessage={() => noOptionsMessage}
                              className='react-select__input'
                              styles={{
                                   // not using baseStyles here because we get zIndex with it which i couuldn't override
                                   control: (_, state) => ({
                                        height: '45px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderWidth: '2px',
                                        borderColor: isLight && !state.isFocused
                                             ? 'rgba(128, 128, 128, 0.2)'
                                             : isLight && state.isFocused
                                                  ? '#475585'
                                                  : !isLight && !state.isFocused
                                                       ? 'rgba(181, 183, 186, 0.4)'
                                                       : '#ECEEF3',
                                        borderRadius: '6px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                             boxShadow: 'none'
                                        },
                                        transition: '200ms',
                                        padding: '2px 2px 2px 4px',
                                        cursor: 'pointer',
                                        '& input': {
                                             color: isLight ? '#0F0E11 !important' : '#FFFFFF !important',
                                             padding: '0 !important'
                                        }
                                   }),
                                   singleValue: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize: '14px',
                                        color: isLight ? '#0F0E11' : '#FFFFFF'
                                   }),
                                   option: (baseStyles, state) => ({
                                        ...baseStyles,
                                        cursor: 'pointer',
                                        fontSize,
                                        backgroundColor: isLight && state.isSelected
                                             ? '#475585'
                                             : !isLight && state.isSelected
                                                  ? '#1B1D20'
                                                  : '#FFFFFF',
                                        color: state.isSelected ? '#FFFFFF' : '#0F0E11',
                                        '&:hover': {
                                             backgroundColor: state.isSelected ? '' : 'rgba(181, 183, 186, 0.5)'
                                        }
                                   }),
                                   placeholder: (baseStyles) => ({
                                        ...baseStyles,
                                        color: isLight ? '#808080' : '#b5b7ba',
                                        fontSize
                                   }),
                                   dropdownIndicator: (baseStyles) => ({
                                        ...baseStyles,
                                        color: isLight ? '#808080' : '#b5b7ba'
                                   }),
                                   noOptionsMessage: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize,
                                        color: '#808080'
                                   })
                              }}
                         />

                         {error && <p className='errorMsg'>{`${error.message}`}</p>}
                    </div>
               )}
          />
     )
}
