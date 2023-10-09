
type AlertMsg = {
    message: string
}

function Alert({ message }: AlertMsg) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-slate-400/90 z-50">
            <div className="flex flex-col gap-3 items-center">
                <div>{message}</div>
                <button className="bg-black text-white w-[200px]">OK</button>
            </div>
        </div>
    )
}

export default Alert