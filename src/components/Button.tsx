import Loader from "./Loader"

type ButtonPropsType = {
    isSubmitting: boolean,
    isLight: boolean,
}

function Button({ isSubmitting, isLight }: ButtonPropsType) {
    return (
        <button
            disabled={isSubmitting}
            className={`disabled:bg-slate-400 ${isLight ? 'lightmode' : 'darkmode'} drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)] `}>
            {
                isSubmitting
                    ?
                    < Loader />
                    :
                    'Submit'
            }
        </button>
    )
}

export default Button