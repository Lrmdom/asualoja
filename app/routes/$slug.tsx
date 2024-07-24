import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { SanityDocument } from '@sanity/client'

import Service from '~/components/ExeclogService'
import { loadQuery } from '~/sanity/loader.server'
import { SERVICE_QUERY } from '~/sanity/queries'
//import { loader } from '~/routes/login'

import Service from '~/components/ExeclogService'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { SERVICE_QUERY, SERVICE_QUERY_LOCALIZED } from '~/sanity/queries'
import { useTranslation } from 'react-i18next'
import i18next from '~/i18next.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  /*const locale = await i18next.getLocale(request)
  
    !params.locale ? (params.locale = locale) : params.locale
    console.log(params)*/
  const { data } = await loadQuery<SanityDocument>(
    SERVICE_QUERY_LOCALIZED,
    params
  )
  return { data }
}

export default function TaxonomyRoute() {
  const { data } = useLoaderData<typeof loader>()

  return <Service service={data} />
}
