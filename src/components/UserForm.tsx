import { useState } from 'react';
import {useForm} from 'react-hook-form'

import Selector from './customComponents/Selector'
import ImagePicker from './customComponents/ImagePicker';
import DatePicker from './customComponents/DatePicker';
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'

import '../styles/userForm.css'

export type DatesType = {
     issuedDate: string,
     expiryDate: string
}

function UserForm({ formType }: { formType: string }) {

     // passed to ImagePicker component
     const [imageFile, setImageFile] = useState<File>()

     // passed to DatePicker component
     const [dates, setDates] = useState<DatesType>({} as DatesType)

     const {register, handleSubmit} = useForm()

     return (
          <form 
          className="font-poppins flex flex-col gap-7 max-w-[600px] select-none " 
          onSubmit={handleSubmit(data => console.log(data))}>
               <h1 className='font-bold text-[#808080] text-center text-[17px]'>
                    DOCUMENT
                    <span className='text-primary-dark mx-[7px]'>
                         {
                              formType === 'lost-doc'
                                   ? '"OWNER"'
                                   : '"FINDER"'
                         }
                    </span>
                    FORM
               </h1>

               <div>
                    <h2 className="form-sub-title">PERSONAL</h2>
                    <div className='form-field-group'>
                         <input type="text" placeholder='Full Name(as in document)' {...register('fullName', {required: 'the field is required!'})}/>
                         <input type="number" placeholder='Contact number' {...register('contact')}/>
                         <input type="text" placeholder='Current Address' {...register('currentAddress')}/>
                         <input type="text" placeholder='Permanent Address' {...register('permanentAddress')}/>
                         <input className='col-span-full' type="email" placeholder='Your Email' {...register('email')}/>
                         <p className="col-span-full note">
                              *Please enter correct email since you will be notified in this email if we find your document in our system.
                         </p>
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">DOCUMENT</h2>
                    <div className='form-field-group'>
                         <Selector
                              placeholder='Select document type'
                              options={documentTypeOptions}
                         />

                         <input type="text" placeholder='Document number' />

                         <Selector
                              placeholder='Select document issued district'
                              options={districtOptions}
                              noOptionsMessage='No district found'
                         />

                         <ImagePicker imageFile={imageFile} setImageFile={setImageFile} />
                         {/* <input type="date" />
                         <input type="date" /> */}

                         <DatePicker date={dates?.issuedDate} setDates={setDates} name='issuedDate' placeholder='Document issued date' />

                         <DatePicker date={dates?.expiryDate} setDates={setDates} name='expiryDate' placeholder='Document expiry date' />
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">MESSAGE</h2>
                    <div className='form-field-group'>
                         <textarea className='col-span-full' 
                         maxLength={200} rows={3} 
                         placeholder="Write short message to display" 
                         {...register('message')}/>
                    </div>
               </div>

               <button className='bg-primary-dark text-white'>Submit</button>
          </form>
     )
}

export default UserForm