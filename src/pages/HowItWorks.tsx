import { useAppSelector } from "../redux/hooks"
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {

  const isLight = useAppSelector((state) => state.navbar.isLight)
  const { t } = useTranslation('howItWorks_ns')

  return (
    <div className="cstm-paged justify-start">

      <div className="w-full">
        <h1 className={`mb-8 ${isLight ? 'title-light' : 'title-dark'}`}>How it works</h1>

        <ul className="flex flex-col gap-3 text-[14px] mb-8">
          <li>{t('1')}</li>
          <li>{t('2')}</li>
          <li>{t('3')}</li>
          <li>{t('4')}</li>
          <li>{t('5')}</li>
          <li>{t('6')}</li>
        </ul>
        <p className="note">{t('note')}</p>
      </div>

    </div>
  )
}
