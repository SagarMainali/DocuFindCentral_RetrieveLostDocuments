import { Trans, useTranslation } from 'react-i18next';

export default function WelcomePage() {

  const { t } = useTranslation('home_ns')

  return (
    <div className="cstm-paged items-center">
      <h2 className="text-center leading-[22px] text-[17px]">
        <Trans ns='home_ns' components={{ br: <br /> }}>
          {t('welcome')}
        </Trans>
      </h2>
    </div>
  )
}
