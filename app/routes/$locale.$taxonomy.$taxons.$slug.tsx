import {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {Link, useLoaderData, useParams} from '@remix-run/react'
import type {SanityDocument} from '@sanity/client'

import {loadQuery} from '~/sanity/loader.server'
import {PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,} from '~/sanity/queries'
import {stegaClean} from "@sanity/client/stega";
import {useTranslation} from "react-i18next";
import ProductDetail from "~/components/productDetail";

export const loader = async ({request, params}: LoaderFunctionArgs) => {
    const {data} = await loadQuery<SanityDocument>(
        PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
        params
    )
    //https://sergiodxa.com/tutorials/load-only-the-data-you-need-in-remix
    //TODO is new Headers() working ok?  https://pyk.sh/remix-set-stale-while-revalidate-cache-control-to-improve-performance#heading-implementing-in-remix
    //https://sergiodxa.com/articles/http-vs-server-side-cache-in-remix
//https://remix.run/docs/en/main/discussion/state-management

    /*data.headers = new Headers()
    const realtimeCaches: { [key: string]: string } = {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"
    };

    // Apply the cache settings to the response
    for (const key of Object.keys(realtimeCaches)) {
        data.headers.append(key, realtimeCaches[key]);
    }*/

    return {data}
}
export const handle = {

    breadcrumb: () => <Link to="/locale/">{useParams().taxonomy}/{useParams().taxons}/{useParams().slug}</Link>,
};
export const meta: MetaFunction = () => {
    return [
        {title: `${useParams().taxonomy}/${useParams().taxons}/${useParams().slug}`},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}
export default function ProductRoute() {
    const {data} = useLoaderData<typeof loader>()
    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage

    return (

        <>
            <div className="relative group">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">

            <span className="rounded border-2 p-4 border-primary text-primary">
              <Link
                  to={`/${language}/${encodeURI(stegaClean(data.taxonomies[0]))}`}>{stegaClean(data.taxonomies[0])}</Link>
              -
              <Link
                  to={`/${language}/${encodeURI(stegaClean(data.taxonomies[0]))}/${encodeURI(stegaClean(data.product.taxon))}`}>{stegaClean(data.product.taxon)}</Link>
              -
                {stegaClean(data.product.title)}</span>
                </div>
            </div>
            <ProductDetail product={[data.product]}/>



        </>
    )
}
