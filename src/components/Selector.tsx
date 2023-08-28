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
               className=''
               options={options}
               placeholder={placeholder}
               isSearchable={noOptionsMessage ? true : false}
               noOptionsMessage={() => noOptionsMessage}
               styles={{
                    // not using baseStyles here because we get zIndex with it which i couuldn't override
                    control: (_, state) => ({
                         display: 'flex',
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
                         color: '#808080',
                    }),
                    noOptionsMessage: (baseStyles) => ({
                         ...baseStyles,
                         fontSize,
                         color: '#808080'
                    })
               }}
          />
     )
}
