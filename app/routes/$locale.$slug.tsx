import type { LoaderFunctionArgs } from '@remix-run/node'
import {Link, useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import Service from '~/components/ExeclogService'
import { loadQuery } from '~/sanity/loader.server'

import Service from '~/components/ExeclogService'
//import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
  TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED
} from '~/sanity/queries'
import i18next from '~/i18next.server'

import { BreadcrumbsItem } from "~/components/BreadcrumbsItem"

export const handle = {
  breadcrumb: () => (
      <Link to="/parent/child">Child Route</Link>
  ),
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { data } = await loadQuery<SanityDocument>(
      TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED,
    params
  )
  return { data }
}




export default function TaxonomyRoute() {
  const { data } = useLoaderData<typeof loader>()
  return <Service taxonomies={data}/>
}
