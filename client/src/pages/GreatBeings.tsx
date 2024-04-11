import { useTranslation } from "react-i18next";

import { useAppSelector } from "../redux/hooks";
import useFetchTickets from "../utils/useFetchTickets";
import { SolvedTicketType } from "../types/globalTypes";

export default function SolvedTicketsContainer() {

  const {t} = useTranslation('great_beings_ns');

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
          <div>
            <h2 className="mb-8 text-center italic">"{t('message')}"</h2>

            {
              tickets.length < 1
                ?
                <h2>{t('null_tickets_message')}</h2>
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
