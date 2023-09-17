import { useForm } from 'react-hook-form'
import { FeedbackFormType } from '../types/globalTypes'
import { useEffect } from 'react'
import capitalizeAndLengthValidation from '../utils/capitalizeAndLengthValidation'
import Loader from '../components/Loader'

export default function Feedback() {

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
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
      }
      else {
        console.log(responseObj.statusText);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful])

  return (
    <div className="cstm-paged">
      <form onSubmit={handleSubmit(onSubmit)} className='w-[500px] form flex flex-col gap-5'>

        <h1>Feedback Hub</h1>

        <div className='flex flex-col gap-1'>
          <label htmlFor="full-name">Your full name*</label>
          <input type="text" placeholder='Sagar Mainali' id='full-name'
            {...register('fullName', {
              required: '*Please provide your full name!'
            })}
            onChange={(e) => setValue('fullName', capitalizeAndLengthValidation(e.target.value, 'name'))}
          />
          {errors.fullName && <p className='errorMsg'>{`${errors.fullName.message}`}</p>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="feedback">Your valuable feedback*</label>
          <textarea maxLength={150} rows={5} id='feedback'
            placeholder="Write your feedback in about 150 words"
            {...register('feedback', { required: 'Please provide your feedback!' })}
            onChange={(e) => setValue('feedback', capitalizeAndLengthValidation(e.target.value, 'feedback'))}
          />
          {errors.feedback && <p className='errorMsg'>{`${errors.feedback.message}`}</p>}
        </div>

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

      </form>
    </div>
  )
}
