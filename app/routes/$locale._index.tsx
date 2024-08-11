import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import {Link, useRouteLoaderData} from "@remix-run/react";
import {loader} from "~/root";
import {Tab} from "@commercelayer/app-elements";
import Prods from "~/components/Prods";


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
    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')

    return (
        <>
            {/*todo add taxonomies images and link to taxons/produts  ex:shop by categorie*/}
            <div className="container p-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">

                {data.map((tx) => {
                console.log(tx)
                return (
                    <div
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-48">

                        <div className="overflow-hidden">

                            <img src={tx.imageUrl} width={250} height={175} alt={tx.title}
                                 />
                            {tx.title}
                            </div>
                    </div>
                )

            })}
            </div>
                </div>
            <Hero/>
        </>
    )
}
