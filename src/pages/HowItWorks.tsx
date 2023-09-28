import { useAppSelector } from "../redux/hooks"

export default function HowItWorks() {

  const isLight = useAppSelector((state) => state.navbar.isLight)

  return (
    <div className="cstm-paged justify-start">

      <div className="w-full">
        <h1 className={`mb-8 ${isLight ? 'title-light' : 'title-dark'}`}>How it works</h1>

        <ul className="flex flex-col gap-3 text-[14px]">
          <li>Step 1: Any of the user(document finder or document owner) fills up the form accordingly from 'Document found' or 'Document lost' section.</li>
          <li>Step 2: As soon as the form gets submitted, a new ticket is generated with a label 'Found' or 'Lost'. View the newly generated from 'Unsolved tickets' section.</li>
          <li>Step 3: Upon every generation of a ticket, the system searches if the ticket with the same information exist in our system.</li>
          <li>Step 4: If that ticket exist, the users(document finder and document owner) are contacted through mail and that ticket is moved to 'Solved tickets'</li>
          <li>Step 5: If the ticket doesn't exist, it is kept in hold in the 'Unsolved Tickets' section waiting for someone to generate a new ticket with the same information.</li>
          <li>Step 6: As soon as the information of two tickets match, the users are contacted through their provided email.</li>
          <li>Step 7: As an appreciation, if any document finder is able to match their ticket with the document owner then they are displayed in 'Great beings section.'</li>
        </ul>
      </div>

    </div>
  )
}
