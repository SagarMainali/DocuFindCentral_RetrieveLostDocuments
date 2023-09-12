import { useEffect } from 'react';
import { useForm } from 'react-hook-form'

import ControlledSelector from './customComponents/ControlledSelector'
import ControlledDatePicker from './customComponents/ControlledDatePicker';
import ControlledImagePicker from './customComponents/ControlledImagePicker';
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'
import { FormDataType } from '../types/globalTypes';

import '../styles/userForm.css'
import Loader from './Loader';

// handling error message
export const requiredMsg = (fieldName: string) => {
     return `*${fieldName} is required!`;
}


function UserForm({ formType }: { formType: string }) {

     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitSuccessful, isSubmitting },
          control,
          reset
     } = useForm<FormDataType>({
          defaultValues: {
               documentType: null,
               documentIssuedDistrict: null
          }
     })

     const onSubmit = async (data: FormDataType) => {

          // const formData = new FormData();
          // formData.append("owner_fullName", data.owner_fullName);
          // formData.append("imageFile", data.imageFile);

          const formData = new FormData();

          // looping over each property in an object
          for (const property in data) {
               if (data.hasOwnProperty(property)) {
                    const value = data[property];

                    if (typeof value === 'string' || value instanceof Blob) {
                         // Handle strings and Blobs
                         formData.append(property, value);
                    } else if (value instanceof File) {
                         // Handle Files
                         formData.append(property, value, value.name);
                    } else if (value !== null && typeof value === 'object') {
                         // Handle SingleValue objects
                         formData.append(property, JSON.stringify(value));
                    }
               }
          }

          try {
               const responseObj = await fetch('http://localhost:8000/api/uploads', {
                    method: 'POST',
                    body: formData
               })
               if (responseObj.ok) {
                    const parsedData = await responseObj.json();
                    console.log("The following data was sent to the server:\n", parsedData);
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
               console.log('Form data passed the validation and reset the form state');
          }
     }, [isSubmitSuccessful])

     return (
          <form noValidate
               className="form flex flex-col gap-7 select-none"
               onSubmit={handleSubmit(onSubmit)}>

               <h1>
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
                                        <input
                                             type="text"
                                             placeholder='Full name of owner(as in document)*'
                                             {...register('owner_fullName')} />
                                        {/* , { required: requiredMsg('Owner name') } */}
                                        {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                   </div>
                                   :
                                   <div>
                                        <input
                                             type="text"
                                             placeholder='Full name of finder*'
                                             {...register('finder_fullName', { required: requiredMsg('Finder name') })} />
                                        {errors.finder_fullName && <p className='errorMsg'>{`${errors.finder_fullName.message}`}</p>}
                                   </div>
                         }

                         <div>
                              <input type="number" placeholder='Contact number*'
                                   {...register('contact')} />
                              {/* , { required: requiredMsg('Contact number') } */}
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
                              <input type="email" placeholder='Your Email*'
                                   {...register('email')} />
                              {/* , { required: requiredMsg('Email address') } */}
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
                                        {...register('owner_fullName')} />
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
                         />

                         {/* <div>
                              <input type="text" placeholder='Document number*'
                                   {...register('documentNumber', { required: requiredMsg('Document number') })} />
                              {errors.documentNumber && <p className='errorMsg'>{`${errors.documentNumber.message}`}</p>}
                         </div>

                         <ControlledSelector
                              control={control}
                              inputName='documentIssuedDistrict'
                              placeholder='Select document issued district*'
                              options={districtOptions}
                              requiredErrorMsg='Document issued district'
                              noOptionsMessage='No district found'
                         />

                         <ControlledDatePicker
                              control={control}
                              inputName='documentIssuedDate'
                              placeholder='Document issued date*'
                              requiredErrorMsg='Document issued date'
                         />

                         <ControlledDatePicker
                              control={control}
                              inputName='documentExpiryDate'
                              placeholder='Document expiry date'
                         /> */}

                         <ControlledImagePicker control={control} />

                    </div>
               </div>

               {/* flex to remove unusual space between its childrens */}
               {/* <div>
                    <h2 className="form-sub-title">MESSAGE</h2>
                    <div className='form-field-group'>
                         <div className='col-span-full flex flex-col'>
                              <textarea maxLength={200} rows={3}
                                   placeholder="Write short message to display*"
                                   {...register('shortMessage', { required: requiredMsg('Message') })} />
                              {errors.shortMessage && <p className='errorMsg'>{`${errors.shortMessage.message}`}</p>}
                         </div>
                    </div>
               </div> */}

               <button
                    disabled={isSubmitting}
                    className='text-white bg-primary-dark disabled:bg-slate-400'>
                    {
                         isSubmitting
                              ?
                              < Loader />
                              :
                              'Submit'
                    }
               </button>
          </form >
     )
}

export default UserForm