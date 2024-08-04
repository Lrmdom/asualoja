import type { LoaderFunctionArgs } from '@remix-run/node'
import {useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import Service from '~/components/ExeclogService'
import { loadQuery } from '~/sanity/loader.server'

import Taxon from '~/components/Taxon'
//import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
    PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED
} from '~/sanity/queries'
import Prods from "~/components/Prods";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { data } = await loadQuery<SanityDocument>(
        PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED,
        params
    )

    return { data }
}

export default function TaxonRoute() {
    const { data } = useLoaderData<typeof loader>()


    return <Taxon taxon={data}/>

/*
    return <Prods products={data.products}></Prods>
*/
}
