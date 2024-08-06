import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import {Link} from "@remix-run/react";


export const handle = {
    breadcrumb: () => <Link to="/parent">Some Route</Link>,
};

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
            <Hero/>

        </>
    )
}
