import UnsolvedTicket from "../components/UnsolvedTicket";
import { UnsolvedTicketType } from "../types/globalTypes";
import useFetchTickets from "../utils/useFetchTickets";

export default function UnsolvedTickets() {

    const path = 'http://localhost:8000/api/get/unsolved_tickets';
    const { tickets, error } = useFetchTickets(path);
    console.log(tickets, error);

    return (
        <div className="cstm-paged flex-col justify-start gap-4">
            <h1>Unsolved tickets</h1>

            <h2 className="w-full text-end">Total: <b>{tickets.length}</b></h2>

            {
                error
                    ?
                    <h2>{error}</h2>
                    :
                    tickets.length < 1
                        ?
                        <h2>'There are no unsolved tickets at the moment.'</h2>
                        :
                        <div className="w-full flex flex-col gap-4">
                            {
                                tickets.map((ticket: UnsolvedTicketType) => <UnsolvedTicket key={ticket.id} {...ticket} />)
                            }
                        </div>
            }

        </div>
    )
}
