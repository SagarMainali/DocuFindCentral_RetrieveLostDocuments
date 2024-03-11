import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { FeedbackFormType } from '../types/globalTypes'
import capitalizeAndLengthValidation from '../utils/capitalizeAndLengthValidation'
import { useAppSelector } from '../redux/hooks'
import Button from '../components/Button'
import Alert from '../components/Alert'

export default function Feedback() {

  const { t } = useTranslation('feedback_form_ns')

  const isLight = useAppSelector((state) => state.navbar.isLight)

  const [response, setResponse] = useState<string | null>(null)

  const { pathname } = useLocation()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FeedbackFormType>()

  const onSubmit = async (data: FeedbackFormType) => {
    try {
      const responseObj = await fetch('http://localhost:8000/api/post/feedbacks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (responseObj.ok) {
        const parsedData = await responseObj.json();
        console.log(parsedData);
        setResponse(parsedData.message);
        reset();
      }
      else {
        console.log(responseObj.statusText);
        setResponse(responseObj.statusText);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setResponse(null)
  }, [pathname])

  return (
    <div className="cstm-paged">
      {
        response
          ?
          <Alert message={response} resetResponse={setResponse} />
          :
          <form onSubmit={handleSubmit(onSubmit)} className={`w-[500px] form flex flex-col gap-5 ${isLight ? 'form-lightmode' : 'form-darkmode'}`}>

            <h1 className={isLight ? 'title-light' : 'title-dark'}>{t('title')}</h1>

            <div className='flex flex-col gap-1'>
              <label htmlFor="full-name">{t('label_fullName')}</label>
              <input type="text" placeholder={t('fullName_PH')} id='full-name'
                {...register('fullName', { required: t('required_fullName') })}
                onChange={(e) => setValue('fullName', capitalizeAndLengthValidation(e.target.value, 'name'))}
              />
              {errors.fullName && <p className='errorMsg'>{`${errors.fullName.message}`}</p>}
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="feedback">{t('label_feedback')}</label>
              <textarea maxLength={150} rows={5} id='feedback'
                placeholder={t('feedback_PH')}
                {...register('feedback', { required: t('required_feedback') })}
                onChange={(e) => setValue('feedback', capitalizeAndLengthValidation(e.target.value, 'feedback'))}
              />
              {errors.feedback && <p className='errorMsg'>{`${errors.feedback.message}`}</p>}
            </div>

            <Button isSubmitting={isSubmitting} isLight={isLight} />

          </form>
      }
    </div>
  )
}
