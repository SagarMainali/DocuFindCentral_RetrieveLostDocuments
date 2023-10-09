import { Dispatch, SetStateAction } from 'react'

type AlertMsg = {
    message: string,
    resetResponse: Dispatch<SetStateAction<string | null>>
}

function Alert({ message, resetResponse }: AlertMsg) {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-white">
            <div className="flex flex-col gap-3 items-center">
                <div>{message}</div>
                <button className="bg-black w-[100px] h-[35px] text-white" onClick={() => resetResponse(null)}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default Alert