import stylesheet from "./tailwind.css?url";
import { Suspense, lazy } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import Footer from "~/components/footer";
import SubscribeNews from "~/components/subscribeNews";
import { json } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import i18next, { localeCookie } from "~/i18next.server";
import { MyNavMenu } from "~/components/myNavMenu";
import { SERVICES_QUERY, SERVICES_QUERY_LOCALIZED } from "~/sanity/queries";
import { loadQuery } from "~/sanity/loader.server";
import type { SanityDocument } from "@sanity/client";
import { stegaClean } from "@sanity/client/stega";

import "@commercelayer/app-elements/style.css";

const LiveVisualEditing = lazy(() => import("~/components/LiveVisualEditing"));

export let loader = async ({ request, params }) => {
  //todo fix bug when url have 1 lang and switch have another  ex: http://localhost:5173/en  and langswitcher have 'pt'
  const locale = await i18next.getLocale(request);
  !params.locale ? (params.locale = locale) : params.locale;
  const { data } = await loadQuery<SanityDocument>(
    SERVICES_QUERY_LOCALIZED,
    params
  );

  const ENV = {
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
    SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
  };
  return json(
    { data, locale, ENV },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export const handle = {
  // In the handle export, we can specify i18n namespaces needed for the route.
  // Usually, we'll set it to our default namespace or "translation" if haven't set one.
  // It can be a string or an array.
  i18n: "common",
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("");
  const { data, locale, ENV } = useRouteLoaderData<typeof loader>("root");
  const revalidator = useRevalidator();

  return (
    <html lang={locale?.locale ?? "pt"}>
      <head title="titulo">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <Meta />
        <Links />
      </head>
      <body>
        <h1>{t("title")}</h1>
        <MyNavMenu services={data} />
        <div className="flow-root">
          <div className="float-right">
            <cl-cart-link>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M4 10H28"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <cl-cart-count></cl-cart-count>
              <cl-cart></cl-cart>
            </cl-cart-link>
          </div>
        </div>
        {children}
        <ScrollRestoration />
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
                if (payload.source === "manual") {
                  revalidator.revalidate();
                }
                if (
                  payload.source === "mutation" &&
                  !payload.livePreviewEnabled
                ) {
                  revalidator.revalidate();
                }
              }}
            />
          </Suspense>
        ) : null}

        <SubscribeNews />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}
