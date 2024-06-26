import { useTranslation } from 'react-i18next'

import SolvedTicket from "../components/SolvedTicket";
import { SolvedTicketType } from "../types/globalTypes";
import useFetchTickets from "../utils/useFetchTickets";
import { useAppSelector } from "../redux/hooks";

export default function SolvedTicketsContainer() {

    const { t } = useTranslation('solved_tickets_ns');

    const isLight = useAppSelector((state) => state.navbar.isLight);

    const path = 'http://localhost:8000/api/get/solved_tickets';
    const { tickets, error } = useFetchTickets(path);

    return (
        <div className="cstm-paged flex-col justify-start gap-4">

            <h1 className={isLight ? 'title-light' : 'title-dark'}>{t('title')}</h1>

            <h2 className="w-full text-end px-2">{t('total')}: <b>{tickets.length}</b></h2>

            {
                error
                    ?
                    <h2>{error}</h2>
                    :
                    tickets.length < 1
                        ?
                        <h2>{t('null_tickets_message')}</h2>
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
