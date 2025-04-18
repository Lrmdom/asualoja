import stylesheet from './tailwind.css?url'
import '@commercelayer/app-elements/vendor.css'
/*
import '@commercelayer/app-elements/style.css'
*/
import {lazy, Suspense, useEffect, useState} from 'react'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useMatches,
    useNavigate,
    useNavigation,
    useRevalidator,
    useRouteLoaderData,
} from '@remix-run/react'
import {json, LinksFunction, MetaFunction} from '@remix-run/node'

import Footer from '~/components/footer'
import SubscribeNews from '~/components/subscribeNews'
import {useChangeLanguage} from 'remix-i18next/react'
import i18next, {localeCookie} from '~/i18next.server'

import {TAXONOMIES_QUERY_LOCALIZED} from '~/sanity/queries'
import {loadQuery} from '~/sanity/loader.server'
import type {SanityDocument} from '@sanity/client'
import {useTranslation} from 'react-i18next'
import Header from "~/components/header"
import MyNavMenu from '~/components/responsiveNavbar'
import Loading from "~/components/loading"
//THIS IS NEEDED FOR SANITY VISUAL EDITING
import {authenticator} from "~/services/auth.server";
import {authenticate} from "@commercelayer/js-auth";
import Cookies from "js-cookie";

const LiveVisualEditing = lazy(() => import("~/components/LiveVisualEditing"));



export function  headers(){
    return {
        "Cache-Control": "max-age=3600",
        "CDN-Cache-Control": "max-age=3600"
    }
}


export let loader = async ({request, params}) => {

    const locale = await i18next.getLocale(request)
    !params.locale ? (params.locale = locale) : params.locale

    const user = await authenticator.isAuthenticated(request, {})


    const {data} = await loadQuery<SanityDocument>(
        TAXONOMIES_QUERY_LOCALIZED,
        params
    )
    const ENV = {
        SANITY_STUDIO_PROJECT_ID: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID,
        SANITY_STUDIO_DATASET: import.meta.env.VITE_SANITY_STUDIO_DATASET,
        SANITY_STUDIO_URL: import.meta.env.VITE_SANITY_STUDIO_URL,
        SANITY_STUDIO_STEGA_ENABLED: import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED,
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
export const meta: MetaFunction = () => {
    return [
        {title: "location.pathname"},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}

export function Layout({children}: { children: React.ReactNode }) {
    const matches = useMatches();

    const navigate = useNavigate()
    const [myToken, setMyToken] = useState(null)

    async function handleToken() {
        let token = "";
        const getCookieToken = Cookies.get("clIntegrationToken");
        if (!getCookieToken || getCookieToken === "undefined") {
            const auth = await authenticate('client_credentials', {
                clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
                scope: 'market:id:vlkaZhkGNj'
            })
            token = auth.accessToken;
            Cookies.set("clIntegrationToken", token, {
                expires: auth.expires
            });
        } else {
            token = getCookieToken || "";
        }
        return token;
    }

    useEffect(() => {
        handleToken().then(r => {
            setMyToken(r)

        }).catch(e => {
            console.log(e)
        })
    }, [])

    /*
    myToken?null:navigate('.', { replace: true })
    */
    const {data, locale, ENV, user} = useRouteLoaderData<typeof loader>('root')
    //const {data, locale, ENV} = useLoaderData<typeof loader>()
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
                src="https://cdn.jsdelivr.net/npm/@commercelayer/drop-in.js@2/dist/drop-in/drop-in.esm.js"
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
        <script src="https://accounts.google.com/gsi/client" async></script>
        <div id="g_id_onload"
             data-client_id='1091535953121-mb4b5ap4uij06s5nqmcbpia3mpdo4437.apps.googleusercontent.com'
             data-login_uri="https://execlogdemo-1091535953121.us-central1.run.app/auth/google"
             data-auto_prompt="true">
        </div>
        <div class="g_id_signin"
             data-type="standard"
             data-size="small"
             data-theme="outline"
             data-text="signin_with"
             data-shape="rectangular"
             data-logo_alignment="left">
        </div>

        <Suspense fallback={<Loading/>}>
            <Header taxonomies={data} user={user} myToken={myToken}></Header>

            <MyNavMenu taxonomies={data}></MyNavMenu>
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
            <Suspense>
                <LiveVisualEditing
                />
            </Suspense>
        ) : null}


        <Scripts/>
        <SubscribeNews/>
        <Footer/>

        </body>
        </html>
    )
}

export default function App() {
    const {locale} = useLoaderData<typeof loader>()
    const navigation = useNavigation();
    useChangeLanguage(locale)

    return (

        /*<div className={ //working animation
            navigation.state === "loading" ? "opacity-70" : ""
        }
        >*/

        /*<AnimatePresence mode="sync"> //working animation
            <motion.div
                key={useLocation().pathname}
                variants={{
                    initial: { opacity: 0, y: -1000 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 1, y: 1000 },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
            >*/
        <Outlet/>
        /* </motion.div>
     </AnimatePresence>*/

        /* </div>*/

    )
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
