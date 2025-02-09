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

const { curly } = require('node-libcurl')

const fs = require('fs');
const request = require('request');

const fs = require("fs");
const { mkdir } = require("fs/promises");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");

export const loader = async ({
                                 request,
                             }: LoaderFunctionArgs) => {

    const downloadFile = (async (url, fileName) => {
        const res = await fetch(url);
        console.log(res)
        if (!fs.existsSync("downloads")) await mkdir("downloads"); //Optional if you already have downloads directory
        const destination = path.resolve("./downloads", fileName);
        const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
        await finished(Readable.fromWeb(res.body).pipe(fileStream));
    });

    await downloadFile("https://ho1tf79n.api.sanity.io/v2021-06-07/data/export/production", "myfiledata.ndjson")



    /* const { data } = await curly.post('https://ho1tf79n.api.sanity.io/v2021-06-07/data/export/production', {
         //postFields: JSON.stringify({ field: 'value' }),
         httpHeader: [
             'Content-Type: application/json',
             'Accept: application/json',
             'Authorization: Bearer sknWtK4sRtdBnGntwSiu8QA4bjYRark5Zh5c9xxKdOP7CaXbdVQeOYAHJSVNt4OGbOjAQIYcWuaCE36TdnuL01UyUv5N0zlTQC7vfxrjSqJY4GLRjobBsAoBKzN7kcl6wPrkR8AIi0BN6Wz3VucDNrct0CrzyMIZiddRDyHC4fIpEvZJibOj'
         ],
     })

     console.log(data)*/
    /*const { exec } = require('child_process');

    exec('curl -H "Authorization: Bearer sknWtK4sRtdBnGntwSiu8QA4bjYRark5Zh5c9xxKdOP7CaXbdVQeOYAHJSVNt4OGbOjAQIYcWuaCE36TdnuL01UyUv5N0zlTQC7vfxrjSqJY4GLRjobBsAoBKzN7kcl6wPrkR8AIi0BN6Wz3VucDNrct0CrzyMIZiddRDyHC4fIpEvZJibOj" "https://ho1tf79n.api.sanity.io/v2021-06-07/data/export/production" > mydataexported.ndjson');
*/



// Define the URL you want to request
    const url = 'https://ho1tf79n.api.sanity.io/v2021-06-07/data/export/production'; // Example URL

// Make a GET request to the URL
    request(url, (error, response, body) => {
        if (error) {
            console.error('Error occurred:', error);
            return;
        }

        // Check if the request was successful (status code 200)
        if (response.statusCode === 200) {
            // Save the response data (body) to a file
            fs.writeFile('responseData.json', body, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Response data saved to responseData.json');
                }
            });
        } else {
            console.log('Request failed with status code:', response.statusCode);
        }
    });


/*
    const client = createClient({
        projectId,
        dataset,
        useCdn: true,
        apiVersion: "2024-06-15",
        stega: {
            enabled: stegaEnabled,
            studioUrl,
        },
       token : "Authorization: Bearer sknWtK4sRtdBnGntwSiu8QA4bjYRark5Zh5c9xxKdOP7CaXbdVQeOYAHJSVNt4OGbOjAQIYcWuaCE36TdnuL01UyUv5N0zlTQC7vfxrjSqJY4GLRjobBsAoBKzN7kcl6wPrkR8AIi0BN6Wz3VucDNrct0CrzyMIZiddRDyHC4fIpEvZJibOj"
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
    return json({success: true}, 200);*/
};
