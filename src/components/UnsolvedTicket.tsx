import { UnsolvedTicketType } from "../types/globalTypes"

function UnsolvedTicket({ owner_fullName, finder_fullName, documentType, ticketType, shortMessage, createdDate }: UnsolvedTicketType) {
    return (
        <div className=" w-full bg-ticket-bg shadow-sm px-4 py-6 rounded-md text-secondary-dark flex flex-col gap-4">
            <div className="flex justify-start gap-3 items-center">
                <h2 className="text-[17px] underline underline-offset-4">{ticketType === 'Lost' ? owner_fullName : finder_fullName}</h2>
                <div className="flex gap-2">
                    <span className="bg-[#FAFAFA] tracking-wider shadow-md  font-bold text-[11px] px-2 py-[3px] rounded-md">
                        {ticketType}
                    </span>
                    <span className="bg-[#FAFAFA] tracking-wider shadow-md  font-bold text-[11px] px-2 py-[3px] rounded-md">
                        {documentType}
                    </span>
                </div>
            </div>
            <p className="text-[16px]">
                {shortMessage}
            </p>
            <h2 className="italic text-[12px]">{createdDate}</h2>
        </div>
    )
}

export default UnsolvedTicket