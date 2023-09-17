import { UnsolvedTicketType } from "../types/globalTypes"

function UnsolvedTicket({ owner_fullName, finder_fullName, documentType, ticketType, shortMessage, createdDate }: UnsolvedTicketType) {
    return (
        <div className="w-full text-primary-light bg-[#3A3B3C] p-3 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[17px] underline underline-offset-4">{ticketType === 'Lost' ? owner_fullName : finder_fullName}</h2>
                <div className="flex gap-3">
                    <span className="bg-primary-light text-secondary-dark font-bold text-[12px] px-2 py-[3px] rounded-md">
                        {ticketType}
                    </span>
                    <span className="bg-primary-light text-secondary-dark font-bold text-[12px] px-2 py-[3px] rounded-md">
                        {documentType}
                    </span>
                </div>
            </div>
            <p className="text-[15px] mb-4">
                {shortMessage}
            </p>
            <h2 className="italic text-[12px]">{createdDate}</h2>
        </div>
    )
}

export default UnsolvedTicket