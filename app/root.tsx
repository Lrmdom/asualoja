import stylesheet from './tailwind.css?url'
import {Suspense, lazy} from 'react'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData, useMatches,
    useRevalidator, useRouteError,
    useRouteLoaderData,
} from '@remix-run/react'
import type {LinksFunction} from '@remix-run/node'

import Footer from '~/components/footer'
import SubscribeNews from '~/components/subscribeNews'
import {json} from '@remix-run/node'
import {useChangeLanguage} from 'remix-i18next/react'
import i18next, {localeCookie} from '~/i18next.server'
import {MyNavMenu} from '~/components/myNavMenu'
import {TAXONOMIES_QUERY_LOCALIZED} from '~/sanity/queries'
import {loadQuery} from '~/sanity/loader.server'
import type {SanityDocument} from '@sanity/client'
import { useTranslation } from 'react-i18next'
import Breadcrumb from "~/components/breadcrumb";
import {authenticator} from "~/services/auth.server";
import Header from "~/components/header"
import {ClientOnly} from "remix-utils/client-only"

import SiteError from "~/components/404";

//import '@commercelayer/app-elements/style.css'
import '@commercelayer/app-elements/vendor.css'
import {InputToggleButton} from "@commercelayer/app-elements";
//import * as process from "node:process";
//import '@commercelayer/app-elements/vendor.css'

const LiveVisualEditing = lazy(() => import('~/components/LiveVisualEditing'))

export let loader = async ({request, params}) => {
    //todo fix bug when url have 1 lang and switch have another  ex: http://localhost:5173/en  and langswitcher have 'pt'

    const locale = await i18next.getLocale(request)
    !params.locale ? (params.locale = locale) : params.locale
    const user = await authenticator.isAuthenticated(request, {})

    const {data} = await loadQuery<SanityDocument>(
        TAXONOMIES_QUERY_LOCALIZED,
        params
    )
    const ENV = {
        SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
        SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
        SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
        SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    }
    return json(
        {data, locale, ENV, user},
        {headers: {'Set-Cookie': await localeCookie.serialize(locale)}}
    )
}

export const links: LinksFunction = () => [
    {rel: 'stylesheet', href: stylesheet},
]
export const handle = {
    // In the handle export, we can specify i18n namespaces needed for the route.
    // Usually, we'll set it to our default namespace or "translation" if haven't set one.
    // It can be a string or an array.
    i18n: 'common',
}

export function Layout({children}: { children: React.ReactNode }) {
    const matches = useMatches();

    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')
    const revalidator = useRevalidator()
    const { i18n } = useTranslation()
    i18n.language=locale

    i18n.changeLanguage(locale, (error) => {
    })


    return (
        <html lang={locale?.locale ?? 'pt'}>
        <head title="titulo">
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <script
                type="module"
                src="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2.4.3/dist/drop-in/drop-in.esm.js"
            ></script>
            <link
                href="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.css"
                rel="stylesheet"
            />
            <link
                href="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/minicart.css"
                rel="stylesheet"
            />
            <Meta/>
            <Links/>
        </head>
        <body>
        <Suspense fallback="loading">
            <Header taxonomies={data} user={user}></Header>
            <MyNavMenu taxonomies={data} user={user}></MyNavMenu>
        </Suspense>
        {/*<Breadcrumb navigationData={data}></Breadcrumb>*/}
        {/*<header>
            <ol>
                {matches
                    .filter(
                        (match) =>
                            match.handle && match.handle.breadcrumb
                    )
                    .map((match, index) => (
                        <li key={index}>
                            {match.handle.breadcrumb(match)}
                        </li>
                    ))}
            </ol>
        </header>*/}
        {children}
        <ScrollRestoration/>
        <script
            dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(ENV)}
                 window.commercelayerConfig = {
                 clientId: 'GMt9oCgl_PQGr_XCwhy3l-V3-9eAEPEeWmGhkEQtnoY',
                 slug: 'execlog',
                 scope: 'market:id:vlkaZhkGNj',
                 debug: 'all', // default is 'none'
                 orderReturnUrl: 'https://example.com' // optional
               }         
              `,
            }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
            <Suspense>
                <LiveVisualEditing
                    refresh={(payload) => {
                        if (payload.source === 'manual') {
                            revalidator.revalidate()
                        }
                        if (
                            payload.source === 'mutation' &&
                            !payload.livePreviewEnabled
                        ) {
                            revalidator.revalidate()
                        }
                    }}
                />
            </Suspense>
        ) : null}

        <SubscribeNews/>
        <Footer/>
        <Scripts/>
        </body>
        </html>
    )
}

export default function App() {
    const {locale} = useLoaderData<typeof loader>()
    useChangeLanguage(locale)
    return <Outlet/>
}
/*export function ErrorBoundary() {

    const error = useRouteError();
    console.error(error);
    return (
        <html>
        <head>
            <title>Oh no!</title>
            <Meta />
            <Links />
        </head>
        <body>
        <SiteError />
        <Scripts />
        </body>
        </html>
    );
}*/
