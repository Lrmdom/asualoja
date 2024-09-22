import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import i18next from '~/i18next.server'
import {useTranslation} from 'react-i18next'

export const loader: LoaderFunction = async ({request}) => {
    const locale = await i18next.getLocale(request)
    return redirect(`/${locale}/?lng=${locale}`)
}

export default function Index() {
    const {t} = useTranslation('')
    return null
}
