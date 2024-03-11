import { Dispatch, SetStateAction } from 'react'
import { useAppSelector } from '../redux/hooks'

type AlertMsg = {
    message: string,
    resetResponse: Dispatch<SetStateAction<string | null>>
}

function Alert({ message, resetResponse }: AlertMsg) {

    const isLight = useAppSelector((state) => state.navbar.isLight)

    return (
        <div className="absolute inset-0 flex justify-center items-center px-10">
            <div className="flex flex-col gap-3 items-center">
                <div className={isLight ? 'text-[#0F0E11]' : '#FFFFFF'}>{message}</div>
                <button className={`w-[80px] h-[35px] text-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)] 
                ${isLight ? 'bg-primary-dark' : 'bg-[#0F0E11]'}`}
                    onClick={() => resetResponse(null)}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default Alert