import { useTranslation } from 'react-i18next'

import { useAppSelector } from "../redux/hooks"

export default function HowItWorks() {

  const isLight = useAppSelector((state) => state.navbar.isLight)
  const { t } = useTranslation('privacy_policy_ns')

  return (
    <div className="cstm-paged justify-start">

      <div className="w-full">
        <h1 className={`mb-8 ${isLight ? 'title-light' : 'title-dark'}`}>{t('title')}</h1>
      </div>

    </div>
  )
}
