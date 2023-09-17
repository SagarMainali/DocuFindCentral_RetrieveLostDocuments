import SolvedTicket from "../components/SolvedTicket";
import { SolvedTicketType } from "../types/globalTypes";
import useFetchTickets from "../utils/useFetchTickets";

export default function SolvedTicketsContainer() {

    const path = 'http://localhost:8000/api/get/solved_tickets';
    const { tickets, error } = useFetchTickets(path);
    console.log(tickets, error);

    return (
        <div className="cstm-paged flex-col justify-start gap-4">

            <h1>Solved tickets</h1>

            <div className="grid grid-cols-4 gap-6 w-full">
                {
                    error
                        ?
                        <h2>{error}</h2>
                        :
                        tickets.length < 1
                            ?
                            <h2>'No tickets have been solved yet.'</h2>
                            :
                            tickets.map((ticket: SolvedTicketType) => <SolvedTicket key={ticket.id} {...ticket} />)
                }
            </div>
        </div>
    )
}
