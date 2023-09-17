import { SolvedTicketType } from "../types/globalTypes"

// owner_fullName, finder_fullName, documentType, createdDate, resolvedDate
function SolvedTicket({ owner_fullName, finder_fullName, documentType, createdDate, resolvedDate }: SolvedTicketType) {
    return (
        <div className="bg-ticket-bg px-4 py-6 rounded-md flex flex-col gap-2">
            <div className="flex justify-between mb-4">
                <h2 className="underline underline-offset-4">{finder_fullName}</h2>
                <svg className="" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
                <h2 className="underline underline-offset-4">{owner_fullName}</h2>
            </div>
            <h2>Document Type: {documentType}</h2>
            <h2>Date created: {createdDate}</h2>
            <h2>Date matched: {resolvedDate}</h2>
        </div>
    )
}

export default SolvedTicket