// ./app/sanity/client.ts

import {createClient} from "@sanity/client";
import {dataset, projectId, stegaEnabled, studioUrl} from "./projectDetails";

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: "2024-06-15",
    stega: {
        enabled: stegaEnabled,
        studioUrl,
    },
});