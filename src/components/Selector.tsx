import Select from 'react-select'

type PropsType = {
     placeholder: string,
     options: {
          value: string,
          label: string
     }[],
     noOptionsMessage?: string
}

export default function Selector({ placeholder, options, noOptionsMessage }: PropsType) {

     const fontSize = '13px'

     return (
          <Select
               className='col-span-full'
               options={options}
               placeholder={placeholder}
               isSearchable={noOptionsMessage ? true : false}
               noOptionsMessage={() => noOptionsMessage}
               styles={{
                    control: (baseStyles, state) => ({
                         ...baseStyles,
                         borderWidth: '2px',
                         borderColor: state.isFocused ? '#475585' : 'rgba(128, 128, 128, 0.2)',
                         borderRadius: '6px',
                         boxShadow: 'none',
                         '&:hover': {
                              boxShadow: 'none'
                         },
                         transition: '200ms',
                         padding: '2px 4px'
                    }),
                    valueContainer: (baseStyles) => ({
                         ...baseStyles,
                         fontSize,
                    }),
                    option: (baseStyles) => ({
                         ...baseStyles,
                         fontSize
                    }),
                    placeholder: (baseStyles) => ({
                         ...baseStyles,
                         color: '#808080',
                         fontSize
                    }),
                    dropdownIndicator: (baseStyles) => ({
                         ...baseStyles,
                         color: '#808080',
                    }),
                    noOptionsMessage: (baseStyles) => ({
                         ...baseStyles,
                         fontSize: '13px',
                         color: '#808080'
                    })
               }}
          />
     )
}
