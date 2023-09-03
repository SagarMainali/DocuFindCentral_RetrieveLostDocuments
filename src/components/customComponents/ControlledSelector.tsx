import Select from 'react-select'
import { Control, Controller } from 'react-hook-form'

import { FormDataType } from '../../types/globalTypes'
import { requiredMsg } from '../UserForm'

type PropsType = {
     // an object that contains methods to link useForm and the Component where it is being used
     control: Control<FormDataType>,
     inputName: keyof FormDataType,
     placeholder: string,
     options: {
          value: string,
          label: string
     }[],
     requiredErrorMsg: string,
     noOptionsMessage?: string
}

export default function ControlledSelector({ control, inputName, placeholder, options, requiredErrorMsg, noOptionsMessage }: PropsType) {

     const fontSize = '13px'

     return (
          // use Controller from react-hook-form to wrap external UI component(library) in order to build a connection
          <Controller
               control={control}
               name={inputName}
               rules={{
                    required: requiredMsg(requiredErrorMsg)
               }}
               render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <div>
                         <Select
                              value={value}
                              onChange={onChange}
                              options={options}
                              placeholder={placeholder}
                              isSearchable={noOptionsMessage ? true : false}
                              noOptionsMessage={() => noOptionsMessage}
                              styles={{
                                   // not using baseStyles here because we get zIndex with it which i couuldn't override
                                   control: (_, state) => ({
                                        height: '45px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderWidth: '2px',
                                        borderColor: state.isFocused ? '#475585' : 'rgba(128, 128, 128, 0.2)',
                                        borderRadius: '6px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                             boxShadow: 'none'
                                        },
                                        transition: '200ms',
                                        padding: '2px 2px 2px 4px',
                                        cursor: 'pointer'
                                   }),
                                   singleValue: (baseStyles) => ({
                                        ...baseStyles,
                                        fontSize: '14px',
                                        color: '#1e1e1e'
                                   }),
                                   option: (baseStyles, state) => ({
                                        ...baseStyles,
                                        cursor: 'pointer',
                                        fontSize,
                                        backgroundColor: state.isSelected ? '#475585' : '',
                                        color: state.isSelected ? 'white' : '#1e1e1e',
                                        '&:hover': {
                                             backgroundColor: 'rgba(71,85,133,0.1)'
                                        }
                                   }),
                                   placeholder: (baseStyles) => ({
                                        ...baseStyles,
                                        color: '#808080',
                                        fontSize
                                   }),
                                   dropdownIndicator: (baseStyles) => ({
                                        ...baseStyles,
                                        color: '#808080'
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
