import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'

export const meta: MetaFunction = () => {
    return [
        {title: 'New Remix App'},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}



export default function Index() {
    const {t} = useTranslation('')
    return (
        <>
            <h1>{t('title')}</h1>

            <Hero/>

        </>
    )
}
