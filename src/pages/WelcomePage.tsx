import { Trans } from 'react-i18next';

export default function WelcomePage() {

  return (
    <div className="cstm-paged items-center">
      <h2 className="text-center leading-[22px] text-[17px]">
        <Trans i18nKey='welcome' ns='homeNS' components={{ br: <br /> }} />
      </h2>
    </div>
  )
}
