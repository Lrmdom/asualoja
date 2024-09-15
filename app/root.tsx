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

import {TAXONOMIES_QUERY_LOCALIZED} from '~/sanity/queries'
import {loadQuery} from '~/sanity/loader.server'
import type {SanityDocument} from '@sanity/client'
import {useTranslation} from 'react-i18next'
import {authenticator} from "~/services/auth.server";
import Header from "~/components/header"
import {ClientOnly} from "remix-utils/client-only"

import SiteError from "~/components/404";
// import {MyNavMenu} from '~/components/myNavMenu'
import MyNavMenu from '~/components/responsiveNavbar'
import '@commercelayer/app-elements/style.css'


//import '@commercelayer/app-elements/vendor.css'
import * as process from "node:process";
//import '@commercelayer/app-elements/vendor.css'

const LiveVisualEditing = lazy(() => import("~/components/LiveVisualEditing"));

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

//https://sergiodxa.com/tutorials/load-only-the-data-you-need-in-remix
    //TODO is new Headers() working ok?  https://pyk.sh/remix-set-stale-while-revalidate-cache-control-to-improve-performance#heading-implementing-in-remix
//https://sergiodxa.com/articles/http-vs-server-side-cache-in-remix
    //https://remix.run/docs/en/main/discussion/state-management

    return json(
        {data, locale, ENV, user},
        {
            headers: {
                'Set-Cookie': await localeCookie.serialize(locale),
                /*"Cache-Control": "public, max-age=0, must-revalidate",
                "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"*/
            }
        }
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
    //const {data, locale, ENV, user} = useLoaderData<typeof loader>()
    const revalidator = useRevalidator()

    const {i18n} = useTranslation()
    i18n.language = locale


    setTimeout(function () {
        i18n.changeLanguage(locale, (error) => {
        })
    }, 100);

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
        <body className="">
        {/*<Suspense fallback={<p>Loading...</p>}>
            <Header taxonomies={data} user={user}></Header>
        </Suspense>*/}
        <Suspense fallback={<p>Loading...</p>}>
            <MyNavMenu taxonomies={data} user={user}></MyNavMenu>
        </Suspense>
{/*
            <div className="sticky top-20  right-20">
                <cl-cart-link target="_self">
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M4 10H28"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <cl-cart-count></cl-cart-count>
                    <cl-cart></cl-cart>
                </cl-cart-link>
            </div>
*/}

        <header>
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
        </header>
        <Suspense fallback={<p>Loading...</p>}>
            {children}
        </Suspense>
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
            <LiveVisualEditing
                //todo check this to setup corretly the refres on sanity studio
                //https://github.com/sanity-io/visual-editing/blob/main/packages/visual-editing/README.md#remix
                /*refresh={(payload, refreshDefault) => {
                    if (payload.source === 'manual') {
                        return refreshDefault()
                    }
                    // Always revalidate on mutations for document types that are used for MetaFunctions that render in <head />
                    if (payload.source === 'mutation' && payload.document._type === 'settings') {
                        return refreshDefault()
                    }
                }}*/
            />
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
