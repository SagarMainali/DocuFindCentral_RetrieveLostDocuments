import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import capitalizeAndLengthValidation from '../utils/capitalizeAndLengthValidation';
import ControlledSelector from './customComponents/ControlledSelector'
import ControlledDatePicker from './customComponents/ControlledDatePicker';
import ControlledImagePicker from './customComponents/ControlledImagePicker';
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'
import { FormDataType } from '../types/globalTypes';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { toggleLoader } from '../redux/loaderSlice';
import Button from './Button';
import Alert from './Alert';

import '../styles/userForm.css'

function UserForm({ formType }: { formType: string }) {

     const { t } = useTranslation('user_form_ns')

     const { i18n } = useTranslation()

     const isLight = useAppSelector((state) => state.navbar.isLight)
     const dispatch = useAppDispatch()

     const { pathname } = useLocation()

     const {
          register,
          setValue,
          handleSubmit,
          formState: { errors, isSubmitting },
          control,
          watch,
          reset,
          trigger
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

     // disable form submission on pressing 'enter' key
     const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLFormElement>): void => {
          if (event.key === 'Enter') {
               event.preventDefault();
          }
     }

     // when route gets changed, the response(message sent from the server which is displayed after submitting the form) is reset
     useEffect(() => {
          setResponse(null)
     }, [pathname])

     // when form gets submitted, the isSubmitting state is changed so this useEffect runs immediately even beofore the onSubmit function gets called 
     useEffect(() => {
          dispatch(toggleLoader(isSubmitting));
     }, [isSubmitting])

     // special useEffect to translate the 'required messages text' as well when clicking the 'change language button' since the required function 
     // where the translation is being passed only gets called upon submitting the form, so we trigger each 'required field' upon clicking the 
     // 'change lanaguage button' 
     useEffect(() => {
          // condition to check if the 'errors' object is empty, if not it means the validation has failed
          if (Object.keys(errors).length > 0) {
               trigger();
          }
     }, [i18n.language])

     return (
          response
               ?
               <Alert message={response} resetResponse={setResponse} />
               :
               <form noValidate
                    className={`form flex flex-col gap-7 select-none ${isLight ? 'form-lightmode' : 'form-darkmode'}`}
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={(e) => handleEnterKeyPress(e)}
               >

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
                                                  {...register('owner_fullName', { required: t('owner_name_RQ') })}
                                                  onChange={(e) => {
                                                       setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                                  }}
                                             />
                                             {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                        </div>
                                        :
                                        <div>
                                             <input type="text" placeholder={t('finder_fullname_PH')}
                                                  {...register('finder_fullName', { required: t('finder_name_RQ') })}
                                                  onChange={(e) => {
                                                       setValue('finder_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                                  }}
                                             />
                                             {errors.finder_fullName && <p className='errorMsg'>{`${errors.finder_fullName.message}`}</p>}
                                        </div>
                              }

                              <div>
                                   <input type="number" placeholder={t('contact_PH')}
                                        {...register('contact', { required: t('contact_RQ') })}
                                        onChange={e => setValue('contact', capitalizeAndLengthValidation(e.target.value, 'contact'))}
                                   />
                                   {errors.contact && <p className='errorMsg'>{`${errors.contact.message}`}</p>}
                              </div>

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

                              <ControlledSelector
                                   control={control}
                                   inputName='documentType'
                                   placeholder={t('document_type_PH')}
                                   options={documentTypeOptions}
                                   requiredErrorMsg={t('document_type_RQ')}
                                   isLight={isLight}
                              />

                              {
                                   (documentType && formType === 'found-doc')
                                   &&
                                   <div>
                                        <input
                                             type="text" placeholder={t('owner_fullname_PH')}
                                             {...register('owner_fullName', { required: t('owner_name_RQ') })}
                                             onChange={(e) => {
                                                  setValue('owner_fullName', capitalizeAndLengthValidation(e.target.value, 'name'));
                                             }}
                                        />
                                        {errors.owner_fullName && <p className='errorMsg'>{`${errors.owner_fullName.message}`}</p>}
                                   </div>
                              }

                              {
                                   documentType &&
                                   <div>
                                        <input type="text" placeholder={t('document_number_PH')}
                                             {...register('documentNumber', { required: t('document_number_RQ') })}
                                        />
                                        {errors.documentNumber && <p className='errorMsg'>{`${errors.documentNumber.message}`}</p>}
                                   </div>
                              }

                              {
                                   (documentType && documentType !== 'PAN') &&
                                   <ControlledSelector
                                        control={control}
                                        inputName='documentIssuedDistrict'
                                        placeholder={t('document_issued_district_PH')}
                                        options={districtOptions}
                                        requiredErrorMsg={t('document_issued_district_RQ')}
                                        noOptionsMessage='No district found'
                                        isLight={isLight}
                                   />
                              }

                              {
                                   (documentType && documentType !== 'PAN' && documentType !== 'Bluebook') &&
                                   <ControlledDatePicker
                                        control={control}
                                        inputName='documentIssuedDate'
                                        placeholder={t('document_issued_date_PH')}
                                        isLight={isLight}
                                        requiredErrorMsg={t('document_issued_date_RQ')}
                                   />
                              }

                              {
                                   (documentType === 'Driving License' || documentType === 'Passport') &&
                                   < ControlledDatePicker
                                        control={control}
                                        inputName='documentExpiryDate'
                                        placeholder={t('document_expiry_date_PH')}
                                        isLight={isLight}
                                        requiredErrorMsg={t('document_expiry_date_RQ')}
                                   />
                              }

                              {
                                   documentType &&
                                   <ControlledImagePicker control={control} isLight={isLight} placeholder={t('document_photo_PH')} fileTypeErrorMsg={t('invalid_image_msg')} />
                              }

                         </div>
                    </div>

                    <div>
                         <h2 className="form-sub-title">{t('sub-title3')}</h2>
                         <div className='form-field-group'>
                              {/* flex to remove unusual space between its childrens */}
                              <div className='col-span-full flex flex-col'>
                                   <textarea maxLength={200} rows={3}
                                        placeholder={t('message_PH')}
                                        {...register('shortMessage', { required: t('message_RQ') })}
                                        onChange={(e) => {
                                             setValue('shortMessage', capitalizeAndLengthValidation(e.target.value, 'shortMessage'));
                                        }}
                                   />
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