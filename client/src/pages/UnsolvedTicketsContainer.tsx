import { useTranslation } from 'react-i18next'

import UnsolvedTicket from "../components/UnsolvedTicket";
import { useAppSelector } from "../redux/hooks";
import { UnsolvedTicketType } from "../types/globalTypes";
import useFetchTickets from "../utils/useFetchTickets";

export default function UnsolvedTicketsContainer() {

    const {t} = useTranslation('unsolved_tickets_ns');

    const isLight = useAppSelector((state) => state.navbar.isLight);

    const path = 'http://localhost:8000/api/get/unsolved_tickets';
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
                        <div className="w-full flex flex-col gap-4">
                            {
                                tickets.map((ticket: UnsolvedTicketType) => <UnsolvedTicket key={ticket.id} {...ticket} />)
                            }
                        </div>
            }

        </div>
    )
}
