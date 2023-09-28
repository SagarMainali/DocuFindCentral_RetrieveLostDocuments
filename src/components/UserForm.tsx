import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import capitalizeAndLengthValidation from '../utils/capitalizeAndLengthValidation';
import ControlledSelector from './customComponents/ControlledSelector'
import ControlledDatePicker from './customComponents/ControlledDatePicker';
import ControlledImagePicker from './customComponents/ControlledImagePicker';
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'
import { FormDataType } from '../types/globalTypes';
import { useAppSelector } from '../redux/hooks'

import '../styles/userForm.css'
import Button from './Button';

// handling error message
export const requiredMsg = (fieldName: string) => {
     return `*${fieldName} is required!`;
}

function UserForm({ formType }: { formType: string }) {

     const isLight = useAppSelector((state) => state.navbar.isLight)

     const { pathname } = useLocation();

     const {
          register,
          setValue,
          handleSubmit,
          formState: { errors, isSubmitSuccessful, isSubmitting },
          control,
          reset
     } = useForm<FormDataType>()

     // custom function to handle submission of form data
     const onSubmit = async (data: FormDataType) => {

          const formData = new FormData();

          // looping over each property in an object to append it to Form Data constructor
          for (const key in data) {
               formData.append(key, data[key]);
          }

          // appending tiket type according to path to search the opposite ticket type in database
          formData.append('ticketType', `${pathname === '/lost-document' ? 'Lost' : 'Found'}`);

          try {
               const responseObj = await fetch('http://localhost:8000/api/post/tickets/', {
                    method: 'POST',
                    // no need to specify the header when sending FormData()
                    body: formData
               })
               if (responseObj.ok) {
                    const parsedData = await responseObj.json();
                    console.log(parsedData);
               }
               else {
                    console.error(responseObj.statusText);
               }
          }
          catch (error) {
               console.error(error);
          }
     }

     // reset inside useEffect to reset after everything is done
     useEffect(() => {
          // isSubmitSuccessful only signifies that the data has passed the validation and 
          // is passed by the handleSubmit function to the custom function
          if (isSubmitSuccessful) {
               reset();
          }
     }, [isSubmitSuccessful])

     return (
          <form noValidate
               className={`form flex flex-col gap-7 select-none ${isLight ? 'form-lightmode' : 'form-darkmode'}`}
               onSubmit={handleSubmit(onSubmit)}>

               <h1 className={`${isLight ? 'title-light' : 'title-dark'}`}>
                    DOCUMENT
                    <span className='mx-[8px]'>
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
                                        <input type="text" placeholder='Full name of owner(as in document)*'
                                             {...register('owner_fullName', {
                                                  required: requiredMsg('Owner name')
                                             })}
                                             onChange={(e) => {
                                                  setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                             }}
                                        />
                                        {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                   </div>
                                   :
                                   <div>
                                        <input type="text" placeholder='Full name of finder*'
                                             {...register('finder_fullName')}
                                             onChange={(e) => {
                                                  setValue('finder_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                             }}
                                        />
                                        {/* , { required: requiredMsg('Finder name') } */}
                                        {errors.finder_fullName && <p className='errorMsg'>{`${errors.finder_fullName.message}`}</p>}
                                   </div>
                         }

                         <div>
                              <input type="number" placeholder='Contact number*'
                                   {...register('contact')}
                                   onChange={e => setValue('contact', capitalizeAndLengthValidation(e.target.value, 'contact'))}
                              />
                              {/* , { required: requiredMsg('Contact number') } */}
                              {errors.contact && <p className='errorMsg'>{`${errors.contact.message}`}</p>}
                         </div>

                         <input type="text" placeholder='Current Address'
                              {...register('currentAddress')}
                              onChange={e => setValue('currentAddress', capitalizeAndLengthValidation(e.target.value, 'currentAddress'))} />

                         {
                              formType === 'lost-doc'
                                   ?
                                   <input type="text" placeholder='Permanent Address'
                                        {...register('permanentAddress')}
                                        onChange={(e) => {
                                             setValue('permanentAddress', capitalizeAndLengthValidation(e.target.value, 'permanentAddress'));
                                        }}
                                   />
                                   :
                                   <input type="text" placeholder='Place where you found the document'
                                        {...register('documentFoundPlace')}
                                        onChange={(e) => {
                                             setValue('documentFoundPlace', capitalizeAndLengthValidation(e.target.value, 'documentFoundPlace'));
                                        }}
                                   />
                         }

                         <div className='col-span-full'>
                              <input type="email" placeholder='Your Email*'
                                   {...register('email', {
                                        required: requiredMsg('Email address'),
                                        pattern: {
                                             value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                             message: 'Invalid email address'
                                        }
                                   })}
                                   onChange={(e) => {
                                        setValue('email', capitalizeAndLengthValidation(e.target.value, 'email'));
                                   }}
                              />
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
                                        type="text" placeholder='Full Name of owner(as in document)*'
                                        {...register('owner_fullName')}
                                        onChange={(e) => {
                                             setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                        }}
                                   />
                                   {/* , { required: requiredMsg('Owner name') } */}
                                   {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                              </div>
                         }

                         <ControlledSelector
                              control={control}
                              inputName='documentType'
                              placeholder='Select document type*'
                              options={documentTypeOptions}
                              requiredErrorMsg='Document type'
                              isLight={isLight}
                         />

                         <div>
                              <input type="text" placeholder='Document number*'
                                   {...register('documentNumber')}
                                   onChange={(e) => {
                                        setValue('documentNumber', capitalizeAndLengthValidation(e.target.value, 'documentNumber'));
                                   }}
                              />
                              {/* , { required: requiredMsg('Document number') } */}
                              {errors.documentNumber && <p className='errorMsg'>{`${errors.documentNumber.message}`}</p>}
                         </div>

                         <ControlledSelector
                              control={control}
                              inputName='documentIssuedDistrict'
                              placeholder='Select document issued district*'
                              options={districtOptions}
                              requiredErrorMsg='Document issued district'
                              noOptionsMessage='No district found'
                              isLight={isLight}
                         />

                         <ControlledDatePicker
                              control={control}
                              inputName='documentIssuedDate'
                              placeholder='Document issued date*'
                              isLight={isLight}
                         // requiredErrorMsg='Document issued date'
                         />

                         <ControlledDatePicker
                              control={control}
                              inputName='documentExpiryDate'
                              placeholder='Document expiry date'
                              isLight={isLight}
                         />

                         <ControlledImagePicker control={control} isLight={isLight} placeholder='Choose image file' fileTypeErrorMsg='Only jpg, jpeg and png types are allowed!' />

                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">MESSAGE</h2>
                    <div className='form-field-group'>
                         {/* flex to remove unusual space between its childrens */}
                         <div className='col-span-full flex flex-col'>
                              <textarea maxLength={200} rows={3}
                                   placeholder="Write short message to display*"
                                   {...register('shortMessage')}
                                   onChange={(e) => {
                                        setValue('shortMessage', capitalizeAndLengthValidation(e.target.value, 'shortMessage'));
                                   }}
                              />
                              {/* , { required: requiredMsg('Message') } */}
                              {errors.shortMessage && <p className='errorMsg'>{`${errors.shortMessage.message}`}</p>}
                         </div>
                    </div>
               </div>

               <Button isSubmitting={isSubmitting} isLight={isLight} />
          </form >
     )
}

export default UserForm