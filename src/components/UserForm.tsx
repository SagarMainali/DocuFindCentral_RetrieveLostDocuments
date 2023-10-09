import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import capitalizeAndLengthValidation from '../utils/capitalizeAndLengthValidation';
import ControlledSelector from './customComponents/ControlledSelector'
import ControlledDatePicker from './customComponents/ControlledDatePicker';
import ControlledImagePicker from './customComponents/ControlledImagePicker';
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'
import { FormDataType } from '../types/globalTypes';
import { useAppSelector } from '../redux/hooks'
import Button from './Button';
import { useTranslation } from 'react-i18next'

import '../styles/userForm.css'
import Alert from './Alert';

function UserForm({ formType }: { formType: string }) {

     const { t } = useTranslation('user_form_ns')

     const isLight = useAppSelector((state) => state.navbar.isLight)

     const { pathname } = useLocation();

     const {
          register,
          setValue,
          handleSubmit,
          formState: { errors, isSubmitting },
          control,
          watch,
          reset
     } = useForm<FormDataType>()

     const [response, setResponse] = useState<string | null>(null)

     // this variable is used to determine whether to disable 'Document Expiray date' field or not
     const documentType = watch('documentType')

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
                    setResponse(parsedData.message);
                    reset();
               }
               else {
                    console.error(responseObj.statusText);
                    setResponse(responseObj.statusText);
               }
          }
          catch (error) {
               console.error(error);
               // setResponse(error);
          }
     }

     return (
          response
               ?
               <Alert message={response} resetResponse={setResponse} />
               :
               <form noValidate
                    className={`form flex flex-col gap-7 select-none ${isLight ? 'form-lightmode' : 'form-darkmode'}`}
                    onSubmit={handleSubmit(onSubmit)}>

                    <h1 className={`${isLight ? 'title-light' : 'title-dark'}`}>
                         {t('document')}
                         <span className='mx-[8px] underline underline-offset-4'>
                              {
                                   formType === 'lost-doc'
                                        ? t('owner')
                                        : t('finder')
                              }
                         </span>
                         {t('form')}
                    </h1>

                    <div>
                         <h2 className="form-sub-title">{t('before_proceeding')}</h2>
                         <ul className='list-disc note -my-[4px] ml-[17px]'>
                              <li>{t('msg1')}</li>
                              <li>{t('msg2')}</li>
                         </ul>
                    </div>

                    <div>
                         <h2 className="form-sub-title">{t('sub-title1')}</h2>
                         <div className='form-field-group'>

                              {
                                   formType === 'lost-doc'
                                        ?
                                        <div>
                                             <input type="text" placeholder={t('owner_fullname_PH')}
                                                  {...register('owner_fullName', {
                                                       required: t('owner_name_RQ')
                                                  })}
                                                  onChange={(e) => {
                                                       setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                                  }}
                                             />
                                             {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                        </div>
                                        :
                                        <div>
                                             <input type="text" placeholder={t('finder_fullname_PH')}
                                                  {...register('finder_fullName')}
                                                  onChange={(e) => {
                                                       setValue('finder_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                                  }}
                                             />
                                             {/* , { required: t('finder_name_RQ') } */}
                                             {errors.finder_fullName && <p className='errorMsg'>{`${errors.finder_fullName.message}`}</p>}
                                        </div>
                              }

                              <div>
                                   <input type="number" placeholder={t('contact_PH')}
                                        {...register('contact')}
                                        onChange={e => setValue('contact', capitalizeAndLengthValidation(e.target.value, 'contact'))}
                                   />
                                   {/* , { required: t('contact_RQ') } */}
                                   {errors.contact && <p className='errorMsg'>{`${errors.contact.message}`}</p>}
                              </div>

                              <input type="text" placeholder={t('current_address_PH')}
                                   {...register('currentAddress')}
                                   onChange={e => setValue('currentAddress', capitalizeAndLengthValidation(e.target.value, 'currentAddress'))} />

                              {
                                   formType === 'lost-doc'
                                        ?
                                        <input type="text" placeholder={t('permanent_address_PH')}
                                             {...register('permanentAddress')}
                                             onChange={(e) => {
                                                  setValue('permanentAddress', capitalizeAndLengthValidation(e.target.value, 'permanentAddress'));
                                             }}
                                        />
                                        :
                                        <input type="text" placeholder={t('document_found_place_PH')}
                                             {...register('documentFoundPlace')}
                                             onChange={(e) => {
                                                  setValue('documentFoundPlace', capitalizeAndLengthValidation(e.target.value, 'documentFoundPlace'));
                                             }}
                                        />
                              }

                              <div className='col-span-full'>
                                   <input type="email" placeholder={t('email_PH')}
                                        {...register('email', {
                                             required: t('email_RQ'),
                                             pattern: {
                                                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                                  message: t('invalid_email_msg')
                                             }
                                        })}
                                        onChange={(e) => {
                                             setValue('email', capitalizeAndLengthValidation(e.target.value, 'email'));
                                        }}
                                   />
                                   {errors.email && <p className='errorMsg'>{`${errors.email.message}`}</p>}
                                   <p className="col-span-full note">{t('note1')}</p>
                              </div>

                         </div>
                    </div>

                    <div>
                         <h2 className="form-sub-title">{t('sub-title2')}</h2>
                         <div className='form-field-group'>
                              {
                                   formType === 'found-doc'
                                   &&
                                   <div>
                                        <input
                                             type="text" placeholder={t('owner_fullname_PH')}
                                             {...register('owner_fullName')}
                                             onChange={(e) => {
                                                  setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                             }}
                                        />
                                        {/* , { required: t('owner_name_RQ') } */}
                                        {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                   </div>
                              }

                              <ControlledSelector
                                   control={control}
                                   inputName='documentType'
                                   placeholder={t('document_type_PH')}
                                   options={documentTypeOptions}
                                   requiredErrorMsg={t('document_type_RQ')}
                                   isLight={isLight}
                              />

                              <div>
                                   <input type="text" placeholder={t('document_number_PH')}
                                        {...register('documentNumber')}
                                   />
                                   {/* , { required: t('document_number_RQ') } */}
                                   {errors.documentNumber && <p className='errorMsg'>{`${errors.documentNumber.message}`}</p>}
                              </div>

                              <ControlledSelector
                                   control={control}
                                   inputName='documentIssuedDistrict'
                                   placeholder={t('document_issued_district_PH')}
                                   options={districtOptions}
                                   requiredErrorMsg={t('document_issued_district_RQ')}
                                   noOptionsMessage='No district found'
                                   isLight={isLight}
                              />

                              <ControlledDatePicker
                                   control={control}
                                   inputName='documentIssuedDate'
                                   placeholder={t('document_issued_date_PH')}
                                   isLight={isLight}
                              // requiredErrorMsg={t('document_issued_date_RQ)}
                              />

                              <ControlledDatePicker
                                   control={control}
                                   inputName='documentExpiryDate'
                                   placeholder={t('document_expiry_date_PH')}
                                   isLight={isLight}
                                   disabled={documentType === 'Citizenship'}
                              />

                              <ControlledImagePicker control={control} isLight={isLight} placeholder={t('document_photo_PH')} fileTypeErrorMsg={t('invalid_image_msg')} />

                         </div>
                    </div>

                    <div>
                         <h2 className="form-sub-title">{t('sub-title3')}</h2>
                         <div className='form-field-group'>
                              {/* flex to remove unusual space between its childrens */}
                              <div className='col-span-full flex flex-col'>
                                   <textarea maxLength={200} rows={3}
                                        placeholder={t('message_PH')}
                                        {...register('shortMessage')}
                                        onChange={(e) => {
                                             setValue('shortMessage', capitalizeAndLengthValidation(e.target.value, 'shortMessage'));
                                        }}
                                   />
                                   {/* , { required: t('message_RQ') } */}
                                   {errors.shortMessage && <p className='errorMsg'>{`${errors.shortMessage.message}`}</p>}
                              </div>
                         </div>
                         <p className="col-span-full note">{t('note2')}</p>
                    </div>

                    <Button isSubmitting={isSubmitting} isLight={isLight} />

               </form >
     )
}

export default UserForm