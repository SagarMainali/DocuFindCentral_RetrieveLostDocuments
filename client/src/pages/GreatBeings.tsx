import { useAppSelector } from "../redux/hooks";
import useFetchTickets from "../utils/useFetchTickets";
import { SolvedTicketType } from "../types/globalTypes";

export default function SolvedTicketsContainer() {

  const isLight = useAppSelector((state) => state.navbar.isLight);

  const path = 'http://localhost:8000/api/get/solved_tickets';
  const { tickets, error } = useFetchTickets(path);

  return (
    <div className="cstm-paged flex-col justify-start gap-4">

      <h1 className={isLight ? 'title-light' : 'title-dark'}>Great Beings</h1>

      <h2 className="w-full text-end px-2">Total: <b>{tickets.length}</b></h2>

      {
        error
          ?
          <h2>{error}</h2>
          :
          <div>
            <h2 className="mb-8 text-center italic">"These are the names of the people that found the document and were successful to match it with the owner.
              'DocuFind Central' thanks all of them for their effort in the well being of the society."</h2>

            {
              tickets.length < 1
                ?
                <h2>No tickets have been solved yet. So couldn't fetch any 'Document Finder' names.</h2>
                :
                <ul className="list-decimal">
                  {
                    tickets.map((ticket: SolvedTicketType) => <li className="mb-[2px]" key={ticket.id}>{ticket.finder_fullName}</li>)
                  }
                </ul>
            }
          </div>
      }

    </div>
  )
}
