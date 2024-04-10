import { useTranslation } from 'react-i18next'

import Loader from "./Loader"

type ButtonPropsType = {
    isSubmitting: boolean,
    isLight: boolean,
}

function Button({ isSubmitting, isLight }: ButtonPropsType) {

    const { t } = useTranslation('button_ns')

    return (
        <button
            disabled={isSubmitting}
            className={`drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)] 
            ${isLight ? 'lightmode disabled:bg-slate-400' : 'darkmode disabled:bg-neutral-700'}`}>
            {
                isSubmitting
                    ?
                    < Loader />
                    :
                    t('text')
            }
        </button>
    )
}

export default Button