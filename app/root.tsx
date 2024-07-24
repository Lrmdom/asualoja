// ./app/root.tsx

import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Suspense, lazy } from "react";
import i18next, { localeCookie } from "./i18next.server";
import { useChangeLanguage } from "remix-i18next/react";
import { loadQuery } from "~/sanity/loader.server";

import type { SanityDocument } from "@sanity/client";
import { stegaClean } from "@sanity/client/stega";
import { SERVICES_QUERY, SERVICES_QUERY_LOCALIZED } from "~/sanity/queries";

import Footer from "./components/footer";
import SubscribeNews from "./components/subscribeNews";
import { MyNavMenu } from "./components/myNavMenu";

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

export default function App() {
  const { data, locale, ENV } = useLoaderData<typeof loader>("root");
  useChangeLanguage(locale);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white">
        <MyNavMenu services={data} />
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
          <Suspense>
            <LiveVisualEditing />
          </Suspense>
        ) : null}

        <SubscribeNews />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
