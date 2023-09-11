type PropsType = {
    name: string,
    label: string,
    message: string,
    date: string
}

function Ticket({ name, label, message, date }: PropsType) {
    return (
        <div className="w-full text-primary-light bg-[#3A3B3C] p-3 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[17px] underline underline-offset-4">{name}</h2>
                <span className="bg-primary-light text-secondary-dark font-bold text-[12px] px-2 py-[3px] rounded-md">
                    {label}
                </span>
            </div>
            <p className="text-[15px] mb-4">
                {message}
            </p>
            <h2 className="italic text-[12px]">{date}</h2>
        </div>
    )
}

export default Ticket