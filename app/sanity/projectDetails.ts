// ./app/sanity/projectDetails.ts

import * as process from "node:process";

declare global {
    interface Window {
        ENV: {
            SANITY_STUDIO_PROJECT_ID: string
            SANITY_STUDIO_DATASET: string
            SANITY_STUDIO_URL: string
            SANITY_STUDIO_STEGA_ENABLED: string
        }
    }
}
const {
    SANITY_STUDIO_PROJECT_ID =import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET = import.meta.env.VITE_SANITY_STUDIO_DATASET,
    SANITY_STUDIO_URL = import.meta.env.VITE_SANITY_STUDIO_URL,
    SANITY_STUDIO_STEGA_ENABLED = import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED,
} = typeof document === 'undefined' ? process.env : window.ENV

export const projectId = SANITY_STUDIO_PROJECT_ID!
export const dataset = SANITY_STUDIO_DATASET!
export const studioUrl = SANITY_STUDIO_URL!
export const stegaEnabled = SANITY_STUDIO_STEGA_ENABLED === 'true'

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET in .env')
if (!studioUrl) throw new Error('Missing SANITY_STUDIO_URL in .env')
if (!stegaEnabled) throw new Error(`Missing SANITY_STUDIO_STEGA_ENABLED in .env`)