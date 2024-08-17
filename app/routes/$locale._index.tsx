import {LoaderFunction, MetaFunction, redirect} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import {Link, useRouteLoaderData} from "@remix-run/react";
import {loader} from "~/root";
import {Tab} from "@commercelayer/app-elements";
import Prods from "~/components/Prods";
import {stegaClean} from "@sanity/client/stega";

export const handle = {
    breadcrumb: () => <Link to="/parent">Some Route</Link>,
};

export const meta: MetaFunction = () => {
    return [
        {title: 'Execlog E-commerce'},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}

export default function Index() {
    const {t} = useTranslation('')
    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')
    const { i18n } = useTranslation()
    const language = i18n.resolvedLanguage
    //console.log(data)
    return (
        <>
            {/*todo add taxonomies images and link to taxons/produts  ex:shop by categorie*/}
            <div className="container p-8">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">

                {data.map((tx) => {

                return (
                    <div
                        className="container p-4 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-48 m-2">

                        <div className="">
                            <div className="flex justify-center hover:opacity-70">
                                    <Link className="absolute flex bg-white text-primary font-bold rounded  m-2.5 p-2 roundec  opacity-85"
                                          to={`/${language}/${stegaClean(tx.title)}`}>
                                        {tx.title}
                                    </Link>
                                <Link className="" to={`/${language}/${stegaClean(tx.title)}`}>
                                    <img src={stegaClean(tx.imageUrl)} width={250} height={175}
                                         alt={stegaClean(tx.title)}
                                         className="container p-1 border rounded m-1 overflow-hidden"
                                    />
                                </Link>
                            </div>
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

