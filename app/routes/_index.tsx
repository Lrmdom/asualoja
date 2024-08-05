import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import i18next, {localeCookie} from '~/i18next.server'

export const loader: LoaderFunction = async ({request}) => {
    const locale = await i18next.getLocale(request)
    return redirect(`/${locale}/?lng=${locale}`)
}

import {useTranslation} from 'react-i18next'

import Hero from '~/components/hero'

export default function Index() {
    const {t} = useTranslation('')
    return (
        <>
            <Hero/>
        </>
    )
}
