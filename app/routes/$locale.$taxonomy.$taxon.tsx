import type { LoaderFunctionArgs } from '@remix-run/node'
import {useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import Service from '~/components/ExeclogService'
import { loadQuery } from '~/sanity/loader.server'

import Taxon from '~/components/Taxon'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
    PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED
} from '~/sanity/queries'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { data } = await loadQuery<SanityDocument>(
        PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED,
        params
    )

//TODO is new Headers() working ok?
    data.headers=new Headers()
    const realtimeCaches: { [key: string]: string } = {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"
    };

    // Apply the cache settings to the response
    for (const key of Object.keys(realtimeCaches)) {
        data.headers.append(key, realtimeCaches[key]);
    }

    return { data }
}

export default function TaxonRoute() {
    const { data } = useLoaderData<typeof loader>()


    return <Taxon taxon={data}/>

/*
    return <Prods products={data.products}></Prods>
*/
}
