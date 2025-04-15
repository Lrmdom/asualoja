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
import Header from "~/components/header"
import MyNavMenu from '~/components/responsiveNavbar'
import Loading from "~/components/loading"
//THIS IS NEEDED FOR SANITY VISUAL EDITING
import {authenticator} from "~/services/auth.server";
import {authenticate} from "@commercelayer/js-auth";
import Cookies from "js-cookie";
import {CommerceLayer, OrderContainer, OrderStorage} from '@commercelayer/react-components'


const LiveVisualEditing = lazy(() => import("~/components/LiveVisualEditing"));

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


export function Layout({children}: { children: React.ReactNode }) {

    const navigate = useNavigate()
    const [myToken, setMyToken] = useState(null)
    const [myToken2, setMyToken2] = useState(null)

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

    async function handleToken2() {
        let token = "";
        const getCookieToken = Cookies.get("clIntegrationToken2");
        if (!getCookieToken || getCookieToken === "undefined") {
            const auth = await authenticate('client_credentials', {
                clientId: 'TcdVOPT9zG3jEjGN76NeLWhW2iBL49GDYg_2HJQVziw',
                clientSecret: '8hRKZxCDdpT7t_86t2eEjwimnSdhI_bXR0i7TMCuvdc',
                scope: 'market:id:vlkaZhkGNj'
            })
            token = auth.accessToken;
            Cookies.set("clIntegrationToken2", token, {
                expires: auth.expires
            });
        } else {
            token = getCookieToken || "";
        }
        return token;
    }

    handleToken2().then(t => {
        setMyToken2(t)

    }).catch(e => {
        console.log(e)
    })
    
    useEffect(() => {
        handleToken().then(r => {
            setMyToken(r)


        }).catch(e => {
            console.log(e)
        })
        /*handleToken2().then(t => {
            setMyToken2(t)

        }).catch(e => {
            console.log(e)
        })*/

    }, [])

    /*
    myToken?null:navigate('.', { replace: true })
    */
    const matches = useMatches();
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
        {myToken != null ? (

            <CommerceLayer
                accessToken={Cookies.get("clIntegrationToken") ? Cookies.get("clIntegrationToken") : ""}
                endpoint="https://execlog.commercelayer.io">
                <OrderStorage persistKey="execlogdemoorder">
                    <OrderContainer>
                        <Suspense fallback={<Loading/>}>
                            <Header taxonomies={data} user={user} myToken={myToken}></Header>
                            <MyNavMenu taxonomies={data}></MyNavMenu>
                            {children}
                        </Suspense>
                    </OrderContainer>
                </OrderStorage>
            </CommerceLayer>

        ) : null
        }
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

        <div className={
            navigation.state === "loading" ? "opacity-70" : ""
        }
        >

            <Outlet/>

        </div>

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
