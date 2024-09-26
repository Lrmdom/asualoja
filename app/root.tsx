import stylesheet from './tailwind.css?url'
import {lazy, Suspense} from 'react'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useMatches,
    useNavigation,
    useRevalidator, useRouteError,
    useRouteLoaderData,
} from '@remix-run/react'
import type {LinksFunction} from '@remix-run/node'
import {json} from '@remix-run/node'

import Footer from '~/components/footer'
import SubscribeNews from '~/components/subscribeNews'
import {useChangeLanguage} from 'remix-i18next/react'
import i18next, {localeCookie} from '~/i18next.server'

import {TAXONOMIES_QUERY_LOCALIZED} from '~/sanity/queries'
import {loadQuery} from '~/sanity/loader.server'
import type {SanityDocument} from '@sanity/client'
import {useTranslation} from 'react-i18next'
import {authenticator} from "~/services/auth.server";
import Header from "~/components/header"
import MyNavMenu from '~/components/responsiveNavbar'
import '@commercelayer/app-elements/style.css'
//import '@commercelayer/app-elements/vendor.css'
import Loading from "~/components/loading"
import * as process from "node:process";
import Sidebar from "~/components/sideBar";
import TaxonomySidebar from "~/components/taxonomy-sidebar";

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


    return (

        <html lang={locale ?? 'pt'}>
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
        <Header taxonomies={data} user={user}></Header>
        <MyNavMenu taxonomies={data} user={user}></MyNavMenu>



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
            <Suspense fallback={<Loading/>}>
                <LiveVisualEditing
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
    const navigation = useNavigation();
    useChangeLanguage(locale)

    return (
        <div className={
            navigation.state === "loading" ? <Loading/> : ""
        }
        >
            <Outlet/>
        </div>

    )
}
export function ErrorBoundary() {

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
}
