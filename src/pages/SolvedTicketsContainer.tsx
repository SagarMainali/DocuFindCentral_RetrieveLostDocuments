import SolvedTicket from "../components/SolvedTicket";
import useFetchTickets from "../utils/useFetchTickets";

export default function SolvedTicketsContainer() {

    const path = 'http://localhost:8000/api/get/solved_tickets';
    const { tickets, error } = useFetchTickets(path);
    console.log(tickets, error);

    return (
        <div className="cstm-paged flex-col justify-start gap-4">

            <h1>Solved tickets</h1>

            <div className="grid grid-cols-4 gap-6 w-full">
                <SolvedTicket
                    founder="Pratap Shah"
                    owner="Rohan Basnet"
                    type="Citizenship"
                    date="2 Sep, 2023"
                />

                <SolvedTicket
                    founder="Ramesh Baniya"
                    owner="Samir Maharjan"
                    type="License"
                    date="9 Sep, 2023"
                />
            </div>
        </div>
    )
}
