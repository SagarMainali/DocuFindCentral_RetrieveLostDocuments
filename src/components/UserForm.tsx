import Select from 'react-select'
import { useState } from 'react'

import '../styles/userForm.css'

function UserForm({ formType }: { formType: string }) {

     const [selectedValue, setSelectedValue] = useState(null)

     const options = [
          { value: 'citizenship', label: 'CitizenShip' },
          { value: 'license', label: 'License' },
          { value: 'passport', label: 'Passport' }
     ]

     return (
          <form className="font-poppins flex flex-col gap-6 max-w-[600px]">
               <h1 className='font-bold text-[#808080] text-center'>
                    DOCUMENT
                    <span className='text-primary-dark'>
                         {
                              formType === 'lost-doc'
                                   ? ' "OWNER" '
                                   : ' "FINDER" '
                         }
                    </span>
                    FORM
               </h1>

               <div>
                    <h2 className="form-sub-title">PERSONAL</h2>
                    <div className='form-field-group'>
                         <input type="text" placeholder='Full Name(as in document)' />
                         <input type="number" placeholder='Contact number' />
                         <input type="text" placeholder='Current Address' />
                         <input type="text" placeholder='Permanent Address' />
                         <input className='col-span-full' type="email" placeholder='Your Email' />
                         <p className="col-span-full note">
                              *Please enter correct email since you will be notified in this email if we find your document match in our system.
                         </p>
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">DOCUMENT</h2>
                    <div className='form-field-group'>
                         <Select
                              className='col-span-full'
                              defaultValue={selectedValue}
                              // onChange={setSelectedValue}
                              options={options}
                              isSearchable={false}
                              placeholder='Select document type'
                              styles={{
                                   control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderWidth: '2px',
                                        borderColor: state.isFocused ? '#475585' : 'rgba(128, 128, 128, 0.2)',
                                        borderRadius: '6px',
                                        transition: '200ms',
                                        boxShadow: 'none',
                                        '&:hover': {
                                             boxShadow: 'none'
                                        }
                                   }),
                                   placeholder: (baseStyles) => ({
                                        ...baseStyles,
                                        color: '#808080',
                                        fontSize: '13px'
                                   }),
                                   dropdownIndicator: (baseStyles) => ({
                                        ...baseStyles,
                                        color: '#808080'
                                   }),
                                   clearIndicator: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? 'red' : 'yellow',
                                        outline: 'none',
                                        backgroundColor: 'red'
                                   })
                              }}
                         />
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">MESSAGE</h2>
                    <div className='form-field-group'>
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                    </div>
               </div>

               <button className='bg-primary-dark text-white'>Submit</button>
          </form>
     )
}

export default UserForm