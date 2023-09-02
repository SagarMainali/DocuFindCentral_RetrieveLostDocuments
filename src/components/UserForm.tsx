import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form'

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

     const { register, handleSubmit, formState: { errors } } = useForm()

     const onSubmit = (data: FieldValues) => {
          console.log(data)
     }

     const requiredMsg = (name: string) => {
          return `*${name} is required!`
     }

     return (
          <form
               className="form font-poppins flex flex-col gap-7 select-none"
               onSubmit={handleSubmit(onSubmit)}>

               <h1 className='font-bold text-[#808080] text-center text-[17px]'>
                    DOCUMENT
                    <span className='text-primary-dark mx-[8px]'>
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

                         {
                              formType === 'lost-doc'
                                   ?
                                   <div>
                                        <input
                                             type="text"
                                             placeholder='*Full name of owner(as in document)'
                                             {...register('owner_fullName', { required: requiredMsg('Owner name') })} />
                                        {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                   </div>
                                   :
                                   <div>
                                        <input
                                             type="text"
                                             placeholder='*Full name of finder'
                                             {...register('finder_fullName', { required: requiredMsg('Finder name') })} />
                                        {errors.finder_fullName && <p className='errorMsg'>{`${errors.finder_fullName.message}`}</p>}
                                   </div>
                         }

                         <div>
                              <input type="number" placeholder='*Contact number'
                                   {...register('contact', { required: requiredMsg('Contact number') })} />
                              {errors.contact && <p className='errorMsg'>{`${errors.contact.message}`}</p>}
                         </div>

                         <input type="text" placeholder='Current Address' {...register('currentAddress')} />

                         {
                              formType === 'lost-doc'
                                   ?
                                   <input type="text" placeholder='Permanent Address' {...register('permanentAddress')} />
                                   :
                                   <input type="text" placeholder='Place where you found the document' {...register('documentFoundPlace')} />
                         }

                         <div className='col-span-full'>
                              <input type="email" placeholder='*Your Email'
                                   {...register('email', { required: requiredMsg('Email address') })} />
                              {errors.email && <p className='errorMsg'>{`${errors.email.message}`}</p>}
                              <p className="col-span-full note">
                                   *Please enter correct email since you will be notified in this email if we find your ticket match in our system.
                              </p>
                         </div>

                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">DOCUMENT</h2>
                    <div className='form-field-group'>
                         {
                              formType === 'found-doc'
                              &&
                              <div>
                                   <input
                                        type="text" placeholder='*Full Name of owner(as in document)'
                                        {...register('owner_fullName', { required: requiredMsg('Owner name') })} />
                                   {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                              </div>
                         }

                         <Selector
                              placeholder='Select document type'
                              options={documentTypeOptions}
                         />

                         <div>
                              <input type="text" placeholder='*Document number'
                                   {...register('documentNumber', { required: requiredMsg('Document number') })} />
                              {errors.documentNumber && <p className='errorMsg'>{`${errors.documentNumber.message}`}</p>}
                         </div>

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
                         {/* flex to remove unusual space between its childrens */}
                         <div className='col-span-full flex flex-col'>
                              <textarea maxLength={200} rows={3}
                                   placeholder="*Write short message to display"
                                   {...register('message', { required: requiredMsg('Message') })} />
                              {errors.message && <p className='errorMsg'>{`${errors.message.message}`}</p>}
                         </div>
                    </div>
               </div>

               <button className='bg-primary-dark text-white'>Submit</button>
          </form >
     )
}

export default UserForm