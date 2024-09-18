import type { LoaderFunctionArgs } from '@remix-run/node'
import {Link, useLoaderData, useRouteLoaderData} from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import { loadQuery } from '~/sanity/loader.server'

import Taxonomy from '~/components/Taxonomy'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import {
  TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED
} from '~/sanity/queries'
import i18next from '~/i18next.server'

import { BreadcrumbsItem } from "~/components/BreadcrumbsItem"
import {Suspense} from "react";

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
  //console.log(data)
  //TODO is new Headers() working ok?
  //https://sergiodxa.com/tutorials/load-only-the-data-you-need-in-remix
  //TODO is new Headers() working ok?  https://pyk.sh/remix-set-stale-while-revalidate-cache-control-to-improve-performance#heading-implementing-in-remix
//https://sergiodxa.com/articles/http-vs-server-side-cache-in-remix
//https://remix.run/docs/en/main/discussion/state-management

  /*data.headers=new Headers()
  const realtimeCaches: { [key: string]: string } = {
    "Cache-Control": "public, max-age=0, must-revalidate",
    "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"
  };

  // Apply the cache settings to the response
  for (const key of Object.keys(realtimeCaches)) {
    data.headers.append(key, realtimeCaches[key]);
  }*/

  return { data }
}

export default function TaxonomyRoute() {
  const { data } = useLoaderData<typeof loader>()

  return (
      <Suspense>
        <Taxonomy taxonomies={data}/>
      </Suspense>
  )
}
