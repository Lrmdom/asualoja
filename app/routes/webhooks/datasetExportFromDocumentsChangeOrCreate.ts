import type {LoaderFunctionArgs} from "@remix-run/node"; // or cloudflare/deno
import {json} from "@remix-run/node";
import {createClient} from "@sanity/client";

import {dataset, projectId, stegaEnabled, studioUrl} from "../../sanity/projectDetails";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exportDataset = require('@sanity/export')

const client = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: "2024-06-15",
    stega: {
        enabled: stegaEnabled,
        studioUrl,
    },
});


export const loader = async ({
                                 request,
                             }: LoaderFunctionArgs) => {


    const client = createClient({
        projectId,
        dataset,
        useCdn: true,
        apiVersion: "2024-06-15",
        stega: {
            enabled: stegaEnabled,
            studioUrl,
        },
       token : "sknWtK4sRtdBnGntwSiu8QA4bjYRark5Zh5c9xxKdOP7CaXbdVQeOYAHJSVNt4OGbOjAQIYcWuaCE36TdnuL01UyUv5N0zlTQC7vfxrjSqJY4GLRjobBsAoBKzN7kcl6wPrkR8AIi0BN6Wz3VucDNrct0CrzyMIZiddRDyHC4fIpEvZJibOj"
    });

    // handle "GET" request
    exportDataset({
        // Instance of @sanity/client configured to correct project ID and dataset
        client: client,

        // Name of dataset to export
        dataset: 'production',

        // Path to write tar.gz-archive file to, or `-` for stdout
        outputPath: '/Users/leoneldomingos/myDataset.tar.gz',

        // Whether or not to export assets. Note that this operation is currently slightly lossy;
        // metadata stored on the asset document itself (original filename, for instance) might be lost
        // Default: `true`
        assets: false,

        // Exports documents only, without downloading or rewriting asset references
        // Default: `false`
        raw: true,

        // Whether or not to export drafts
        // Default: `true`
        drafts: false,

        // Export only given document types (`_type`)
        // Optional, default: all types
        types: ['products', 'variants'],

        // Run 12 concurrent asset downloads
        assetConcurrency: 12,

        // What mode to use when exporting documents, can be eiter `stream`(default) or `cursor`.
        // Cursor mode might help when dealing with large datasets, but might yield inconsistent results if the dataset is mutated during export.
        // Default: 'stream'
        mode: 'stream',
    })
    return json({success: true}, 200);
};
