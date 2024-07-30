import {vitePlugin as remix} from "@remix-run/dev";
import {installGlobals} from "@remix-run/node";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {remixDevTools} from "remix-development-tools";
//import vitePluginRequire from "vite-plugin-require";
//import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node'
installGlobals();

export default defineConfig({
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: ["lodash","@commercelayer/react-components"]
    },
   /* ssr: {
        noExternal: ["@commercelayer/react-components", "lodash"]
    },*/
    plugins: [
        //vitePluginRequire,
        //commonjs(),
        nodePolyfills(),
        remixDevTools(),
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
    build: {
        sourcemap: true, // Enables source maps
        commonjsOptions: {
            //include: [/node_modules/],
            transformMixedEsModules: true,
        },

    },


});
