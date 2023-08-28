import '../styles/userForm.css'
import Selector from './Selector'
import documentTypeOptions from '../options/documentTypeOptions'
import districtOptions from '../options/districtOptions'

function UserForm({ formType }: { formType: string }) {

     return (
          <form className="font-poppins flex flex-col gap-7 max-w-[600px]">
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
                         <input type="text" placeholder='Full Name(as in document)' />
                         <input type="number" placeholder='Contact number' />
                         <input type="text" placeholder='Current Address' />
                         <input type="text" placeholder='Permanent Address' />
                         <input className='col-span-full' type="email" placeholder='Your Email' />
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
                         <Selector
                              placeholder='Select issued district'
                              options={districtOptions}
                              noOptionsMessage='No district found'
                         />
                    </div>
               </div>

               <div>
                    <h2 className="form-sub-title">MESSAGE</h2>
                    <div className='form-field-group'>
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                         <textarea className='col-span-full' maxLength={200} rows={3} placeholder="Write short message to display" />
                    </div>
               </div>

               <button className='bg-primary-dark text-white'>Submit</button>
          </form>
     )
}

export default UserForm