import { useAppSelector } from "../redux/hooks"
import { useTranslation, Trans } from 'react-i18next'

export default function HowItWorks() {

  const isLight = useAppSelector((state) => state.navbar.isLight)
  const { t } = useTranslation('howItWorks_ns')

  const replacements = {
    b: <b />
  }

  return (
    <div className="cstm-paged justify-start">

      <div className="w-full">
        <h1 className={`mb-8 ${isLight ? 'title-light' : 'title-dark'}`}>How it works</h1>

        <ul className="flex flex-col gap-3 mb-8">
          <li>{t('1')}</li>
          <li><Trans ns="howItWorks_ns" components={replacements}>2</Trans></li>
          <li>{t('3')}</li>
          <li><Trans ns="howItWorks_ns" components={replacements}>4</Trans></li>
          <li><Trans ns="howItWorks_ns" components={replacements}>5</Trans></li>
          <li>{t('6')}</li>
        </ul>
        <p><i><Trans ns="howItWorks_ns" components={replacements}>note</Trans></i></p>
      </div>

    </div>
  )
}
