import {vitePlugin as remix} from '@remix-run/dev'
import {installGlobals} from "@remix-run/node";
import {defineConfig,loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {remixDevTools} from 'remix-development-tools'
import { VitePWA } from 'vite-plugin-pwa'


installGlobals();

export default defineConfig({

    plugins: [
        VitePWA(),
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
            transformMixedEsModules: true,
        },

    },
})
