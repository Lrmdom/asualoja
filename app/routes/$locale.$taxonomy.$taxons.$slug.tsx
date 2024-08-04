import type { LoaderFunctionArgs } from '@remix-run/node'
import {useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import { loadQuery } from '~/sanity/loader.server'

//import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
  PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
} from '~/sanity/queries'
import Variants from "~/components/Variants";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { data } = await loadQuery<SanityDocument>(
      PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE,
    params
  )
  return { data }
}

export default function ProductRoute() {
  const { data } = useLoaderData<typeof loader>()
  return <Variants product={data.product}/>
}
