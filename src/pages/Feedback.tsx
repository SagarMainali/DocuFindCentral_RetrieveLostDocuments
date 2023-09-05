import { useForm } from 'react-hook-form'
import { FeedbackFormType } from '../types/globalTypes'
import { useEffect } from 'react'

export default function Feedback() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FeedbackFormType>()

  const onSubmit = (data: FeedbackFormType) => {
    console.log(data)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      console.log('Feedback has been submitted successfully!');
    }
  }, [isSubmitSuccessful])

  return (
    <div className="cstm-paged">
      <form onSubmit={handleSubmit(onSubmit)} className='w-[500px] form flex flex-col gap-5'>

        <h2 className='font-bold text-primary-dark text-center text-[17px]'>Feedback Hub</h2>

        <div className='flex flex-col gap-1'>
          <label htmlFor="full-name">Your full name*</label>
          <input type="text" placeholder='Sagar Mainali' id='full-name'
            {...register('fullName', {
              required: '*Please provide your full name!'
            })
            } />
          {errors.fullName && <p className='errorMsg'>{`${errors.fullName.message}`}</p>}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="feedback">Your valuable feedback*</label>
          <textarea maxLength={150} rows={5} id='feedback'
            placeholder="Write your feedback in about 150 words"
            {...register('feedback', { required: 'Please provide your feedback!' })} />
          {errors.feedback && <p className='errorMsg'>{`${errors.feedback.message}`}</p>}
        </div>

        <button className='bg-primary-dark text-white'>Submit</button>

      </form>
    </div>
  )
}
