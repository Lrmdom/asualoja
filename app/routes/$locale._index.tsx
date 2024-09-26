import {MetaFunction} from '@remix-run/node'

import {useTranslation} from 'react-i18next'
import Hero from '~/components/hero'
import {Link, useRouteLoaderData} from "@remix-run/react";
import {loader} from "~/root";
import {stegaClean} from "@sanity/client/stega";


export const meta: MetaFunction = () => {
    return [
        {title: 'Execlog E-commerce'},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}

export default function Index() {
    const {t} = useTranslation('')
    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')


    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage


    i18n.language = locale

    return (
        <>
            {/*todo add taxonomies images and link to taxons/produts  ex:shop by categorie*/}
            <div className="container p-8">

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data.map((tx) => {

                        return (

                            <div key={tx._id}
                                 className="container m-2 w-full overflow-hidden rounded-md p-4 aspect-h-1 aspect-w-1 group-hover:opacity-75 lg:aspect-none lg:h-48">



                                        <Link className="" to={`/${language}/${stegaClean(tx.title)}`}>
                                            <div className="relative">
                                                <img className="h-64 w-full rounded-md object-cover"
                                                     src={stegaClean(tx.imageUrl)} width={250} height={175}
                                                     alt={stegaClean(tx.title)}/>
                                                <div
                                                    className="absolute inset-0 rounded bg-gray-700 opacity-60 "></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <h2 className="rounded bg-white font-bold opacity-80 hover:opacity-100 shadow-2xl text-primary">{stegaClean(tx.title)}</h2>
                                                </div>
                                            </div>

                                        </Link>


                            </div>
                        )
                    })}
                </div>
            </div>
            <Hero/>
        </>
    )
}

