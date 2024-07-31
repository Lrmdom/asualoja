import {vitePlugin as remix} from "@remix-run/dev";
import {installGlobals} from "@remix-run/node";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {remixDevTools} from "remix-development-tools";
//import commonjs from '@rollup/plugin-commonjs'
import { flatRoutes } from 'remix-flat-routes'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from 'vite-plugin-commonjs';
import { VitePWA } from 'vite-plugin-pwa'

installGlobals();

export default defineConfig({

    optimizeDeps: {
        include: ["*"],
        //exclude: [ "lodash","@commercelayer/sdk"]
    },

    /*ssr: {
        noExternal: [ "lodash"]
    },*/
    plugins: [
        VitePWA(),
        nodePolyfills(),
        remixDevTools(),
        remix({
            ignoredRouteFiles: ['**/*'],
            routes: async (defineRoutes) => {
                return flatRoutes('routes', defineRoutes, {
                    ignoredRouteFiles: [
                        '.*',
                        '**!/!*.css',
                        '**!/!*.test.{js,jsx,ts,tsx}',
                        '**!/__*.*',
                        // This is for server-side utilities you want to colocate
                        // next to your routes without making an additional
                        // directory. If you need a route that includes "server" or
                        // "client" in the filename, use the escape brackets like:
                        // my-route.[server].tsx
                        '**!/!*.server.*',
                        '**!/!*.client.*',
                    ],
                })
            },
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
        /*commonjs({
            filter(id) {
                if (id.includes('node_modules/lodash')) {
                    return true;
                }

            },
        }),*/
    ],
    build: {
        sourcemap: true, // Enables source maps
        commonjsOptions: {
            //include: [/node_modules/],
            transformMixedEsModules: true,
        },

    },
});
