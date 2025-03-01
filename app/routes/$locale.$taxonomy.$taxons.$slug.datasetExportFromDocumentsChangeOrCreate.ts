import type {LoaderFunctionArgs} from "@remix-run/node"; // or cloudflare/deno
import {createClient} from "@sanity/client";

import { projectId, stegaEnabled, studioUrl} from "../sanity/projectDetails";
import {Storage} from "@google-cloud/storage";
import {evaluate, parse} from 'groq-js'

import {
    PRODUCT_FILTEREDBY_TAXONOMY_TAXON_LOCALIZED,
    PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE
} from '~/sanity/queries'
import dataset2 from '../dataset.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires




const client = createClient({
    projectId,
    useCdn: true,
    apiVersion: "2024-06-15",
    stega: {
        enabled: stegaEnabled,
        studioUrl,
    },
});

import fs from "fs"
import {ndjsonToJsonText} from "ndjson-to-json-text";

//todo groqwebhook export with sanity dataset export production  localPath.tar.gz  to file (use http?- to local path or gcp bucket)
// todo convert ndjson to json with a script or gcp serverless function??? Google serach - convert ndjson to json serverless function
//stringify ndjson and then ndjsontext to jsontext
//TODO or use https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-topic-to-text?hl=pt-br#api

export const loader = async ({
                                 request, params
                             }: LoaderFunctionArgs) => {

    //const input=`*[_type == "taxonomy" && title[_key == $locale][0].value == $taxonomy]`
    const input = PRODUCT_FILTEREDBY_TAXONOMY_TAXON_PRODUCTTITLE
// Returns an ESTree-inspired syntax tree
    let tree = parse(input, {params})
    const jsonText = ndjsonToJsonText(dataset2)
// [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"},{"id":3,"name":"Carol"}]
    const dataset = JSON.parse(jsonText);
// actual json object!!

    // Evaluate a tree against a dataset
    let value = await evaluate(tree, {dataset})

// Gather everything into one JavaScript object
    let result = await value.get()
    console.log(result)

    return {result}


    /*let resp = await fetch('https://ho1tf79n.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22taxonomy%22%5D%0A%0A+%7B++_type%2C%0A++++%22title%22%3A+title%2C%0A++++%22imageUrl%22%3A+image.asset-%3Eurl+%2B+%22%3Fauto%3Dformat%26w%3D250%22%2C%0A++++taxons%5B%5D-%3E%7B%0A++++++_type%2C%0A++++++%22title%22%3A+title%2C%0A++++++++taxons%5B%5D-%3E%7B%0A++++++++++_type%2C%0A++++++++++++%22title%22%3A+title%2C%0A++++++++++++products%5B%5D-%3E%7B%22imageUrl%22%3A+image.asset-%3Eurl+%2B+%22%3Fauto%3Dformat%26w%3D250%22%2C%0A++++++++++++%22title%22%3A+title%2C%0A++++++++++++++++%22attributes%22%3A+tit%2C%0A++++++++++++++++variants%5B%5D-%3E%7B+%0A++++++++++++++++sku%2C%0A++++++++++++++++%22images%22%3A+images%5B%5D%7B%0A++++++++++++++++++++++++++%27url%27%3A+asset-%3Eurl+%2B+%22%3Fauto%3Dformat%26w%3D250%22%2C%0A++++++++++++++++++++++++++%7D%2C%0A++++++++++++++++++++%22title%22%3A+title%2C%0A++++++++++++++++++++%22attributes%22%3A+%0A++++++++++++++++++++++++attributes++++++++%0A++++++++++++++++%7D+++%0A++++++++++++%7D+%0A++++++++%7D%2C%0A++++++++products%5B%5D-%3E%7B%22imageUrl%22%3A+image.asset-%3Eurl+%2B+%22%3Fauto%3Dformat%26w%3D250%22%2C%0A++++++++++++%22title%22%3A+title%2C%0A++++++++++++%22attributes%22%3A+%0A++++++++++++++++++++attributes+%2C%0A++++++++++++variants%5B%5D-%3E%7B+sku%2C%0A++++++++++++%22images%22%3A+images%5B%5D%7B%0A++++++++++++++++++++%27url%27%3A+asset-%3Eurl+%2B+%22%3Fauto%3Dformat%26w%3D250%22%2C%0A++++++++++++++++++++%7D%2C%0A++++++++++++++++++++%22title%22%3A+title+%2C%0A++++++++++++++++%22attributes%22%3A+%0A++++++++++++attributes%0A++++++++++++++++++++++++++++++++++++++++++++++++++++++++++%0A++++++++++++%7D%0A+++++++++%7D%0A++++%7D+%0A+%7D%0A++&%24locale=%22en%22&%24taxon=%22Road%22&%24taxonomy=%22Bicycles%22&perspective=published')
    const jsn = await resp.json()

    const filename = "myfiledata.json"

    fs.writeFileSync(filename, JSON.stringify(jsn.result), {encoding: 'utf8', flag: 'w'});

    const storage = new Storage({
        projectId: "avid-infinity-370500",
        keyFilename: "service-account.json",
    });

    const uploadToFirebaseStorage = async (uploadFilePath, fileName) => {
        try {
            const gcs = storage.bucket("sanity_production_dataset"); // Removido "gs://" do nome do bucket
            const result = await gcs.upload(fileName, {
                destination: uploadFilePath,
                /!*predefinedAcl: 'publicRead', // Defina o arquivo para ser legível publicamente
                metadata: {
                    contentType: "application/main", // Ajuste o tipo de conteúdo conforme necessário
                }*!/
            });
            return result[0].metadata.mediaLink;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    const uploadfilepath = `dataset/${filename}`

    const link = await uploadToFirebaseStorage(uploadfilepath, filename);
    console.log(link);

    /!*const downloadAsJson =  async () => {
        const file = new Storage()
            .bucket("sanity_production_dataset")
            .file(`dataset/${filename}`)
        return file.cloudStorageURI.href;
    }*!/
    const file = new Storage()
        .bucket("sanity_production_dataset")
        .file(`dataset/${filename}`).cloudStorageURI.href

    console.log(file)

    const dataset = JSON.parse(await fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'}));

    // Evaluate a tree against a dataset
    let value = await evaluate(tree, {dataset})

// Gather everything into one JavaScript object
    let result = await value.get()

    return {result}*/

};
