import { useTranslation } from 'react-i18next'

export default function Component() {
  let { t } = useTranslation('')
  return <h1>{t('title')}</h1>
}
