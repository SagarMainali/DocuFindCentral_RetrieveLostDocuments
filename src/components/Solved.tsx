type PropsType = {
    founder: string,
    owner: string,
    type: string,
    date: string
}

function Solved({ founder, owner, type, date }: PropsType) {
    return (
        <div className="text-primary-light bg-secondary-dark/90 p-3 rounded-md flex flex-col gap-3">
            <div className="flex justify-between">
                <h2 className="underline underline-offset-4">{founder}</h2>
                <svg className="fill-primary-light" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
                <h2 className="underline underline-offset-4">{owner}</h2>
            </div>
            <h2>Document Type: {type}</h2>
            <h2>Date matched: {date}</h2>
        </div>
    )
}

export default Solved