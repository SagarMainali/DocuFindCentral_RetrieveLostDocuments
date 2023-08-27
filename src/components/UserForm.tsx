import '../styles/userForm.css'

function UserForm({ formType }: { formType: string }) {
     return (
          <form className="font-poppins flex flex-col gap-6">
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
                         <p className="col-span-full note">*Please enter correct email since you will be notified in this email after the ticket matches.</p>
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">DOCUMENT</h2>
                    <div className='form-field-group'>

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