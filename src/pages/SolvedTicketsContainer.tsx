import SolvedTicket from "../components/SolvedTicket";
import { SolvedTicketType } from "../types/globalTypes";
import useFetchTickets from "../utils/useFetchTickets";

export default function SolvedTicketsContainer() {

    const path = 'http://localhost:8000/api/get/solved_tickets';
    const { tickets, error } = useFetchTickets(path);

    return (
        <div className="cstm-paged flex-col justify-start gap-4">

            <h1>Solved tickets</h1>

            <h2 className="w-full text-end">Total: <b>{tickets.length}</b></h2>

            {
                error
                    ?
                    <h2>{error}</h2>
                    :
                    tickets.length < 1
                        ?
                        <h2>There are no solved tickets at the moment.</h2>
                        :
                        <div className="grid grid-cols-3 gap-5 w-full">
                            {
                                tickets.map((ticket: SolvedTicketType) => <SolvedTicket key={ticket.id} {...ticket} />)
                            }
                        </div>
            }

        </div>
    )
}
