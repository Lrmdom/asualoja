import type { LoaderFunctionArgs } from '@remix-run/node'
import {Link, useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import { loadQuery } from '~/sanity/loader.server'

//import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
  PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
} from '~/sanity/queries'
import Variants from "~/components/Variants";
import {stegaClean} from "@sanity/client/stega";
import Attributes from "~/components/Attributes";
import {useTranslation} from "react-i18next";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { data } = await loadQuery<SanityDocument>(
      PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
    params
  )

  return { data }
}

export default function ProductRoute() {
  const { data } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage


  return (
      <>
        <div className="group relative">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
            <span className="border-2 border-primary p-4 rounded text-primary">
              <Link to={`/${language}/${stegaClean(data.taxonomies[0])}`}>{stegaClean(data.taxonomies[0])}</Link>
              -
              <Link to={`/${language}/${stegaClean(data.taxonomies[0])}/${stegaClean(data.product.taxon)}`}>{stegaClean(data.product.taxon)}</Link>
              -
              {stegaClean(data.product.title)}</span>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

              <div
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">

                <img src={data.product.imageUrl} width={75} alt={data.product.title}
                     className="h-full w-full object-contain object-center lg:h-full lg:w-full"/>


              </div>

            </div>
            <div className="">
              {data.product.description}
            </div>
            <div className="mt-4 flex justify-between border-2">
              <Attributes product={data.product}></Attributes>
            </div>
            <div className="mt-4 flex justify-between">
              <Variants product={data.product}></Variants>
            </div>

          </div>
        </div>
      </>
  )


}
