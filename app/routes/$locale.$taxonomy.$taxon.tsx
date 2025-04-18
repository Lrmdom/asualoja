import type {LoaderFunctionArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import type {SanityDocument} from '@sanity/client'
import {loadQuery} from '~/sanity/loader.server'

import Taxon from '~/components/Taxon'
import {PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED} from '~/sanity/queries'

export const loader = async ({request, params}: LoaderFunctionArgs) => {
    const {data} = await loadQuery<SanityDocument>(
        PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED,
        params
    )

//TODO is new Headers() working ok?
    //https://sergiodxa.com/tutorials/load-only-the-data-you-need-in-remix
    //TODO is new Headers() working ok?  https://pyk.sh/remix-set-stale-while-revalidate-cache-control-to-improve-performance#heading-implementing-in-remix
//https://sergiodxa.com/articles/http-vs-server-side-cache-in-remix
//https://remix.run/docs/en/main/discussion/state-management

     data.headers=new Headers()
     const realtimeCaches: { [key: string]: string } = {
         "Cache-Control": "public, max-age=3600, must-revalidate",
         "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"
     };

     // Apply the cache settings to the response
     for (const key of Object.keys(realtimeCaches)) {
         data.headers.append(key, realtimeCaches[key]);
     }

    return {data}
}

export default function TaxonRoute() {
    const {data} = useLoaderData<typeof loader>()


    return <Taxon taxon={data}/>

    /*
        return <Prods products={data.products}></Prods>
    */
}
