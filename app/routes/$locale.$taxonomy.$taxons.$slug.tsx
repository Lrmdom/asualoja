import type {LoaderFunctionArgs} from '@remix-run/node'
import {Link, useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type {SanityDocument} from '@sanity/client'

import {loadQuery} from '~/sanity/loader.server'

import {useQuery} from '~/sanity/loader'
import {loadQuery} from '~/sanity/loader.server'
import {
    PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
} from '~/sanity/queries'
import Variants from "~/components/Variants";
import {stegaClean} from "@sanity/client/stega";
import Attributes from "~/components/Attributes";
import {useTranslation} from "react-i18next";
import Prods from "~/components/Prods";
import ProductDetail from "~/components/productDetail";
import {ClientOnly} from "remix-utils/client-only"
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";

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

export default function ProductRoute() {
    const {data} = useLoaderData<typeof loader>()
    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage

    return (

        <>
            <div className="group relative">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">

            <span className="border-2 border-primary p-4 rounded text-primary">
              <Link to={`/${language}/${encodeURI(stegaClean(data.taxonomies[0]))}`}>{stegaClean(data.taxonomies[0])}</Link>
              -
              <Link
                  to={`/${language}/${encodeURI(stegaClean(data.taxonomies[0]))}/${encodeURI(stegaClean(data.product.taxon))}`}>{stegaClean(data.product.taxon)}</Link>
              -
             {stegaClean(data.product.title)}</span>
                </div>
            </div>
            <ClientOnly fallback={null}>
                {() => <ProductDetail product={[data.product]} />}
            </ClientOnly>


            {/*<Prods products={[data.product]}></Prods>*/}

            {/*<div className="group relative">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div
                            className="border rounded p-1 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-48">
                            <img src={data.product.imageUrl} width={75} alt={data.product.title}
                                 className="bg-gray-50 border-2 rounded h-full w-full object-contain object-center lg:h-full lg:w-full"/>
                        </div>
                    </div>
                    <div className="">
                        {data.product.title}
                    </div>
                    <div className="">
                        {data.product.description}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Attributes product={data.product}></Attributes>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Variants product={data.product}></Variants>
                    </div>
                </div>
            </div>*/}


        </>
    )
}
