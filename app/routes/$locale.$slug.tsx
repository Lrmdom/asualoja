import {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {Link, useLoaderData, useParams} from '@remix-run/react'
import type {SanityDocument} from '@sanity/client'

import {loadQuery} from '~/sanity/loader.server'

import Taxonomy from '~/components/Taxonomy'
import {TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED} from '~/sanity/queries'
import Sidebar from "~/components/sideBar";

import {parse, evaluate} from 'groq-js'

export const loader = async ({request, params}: LoaderFunctionArgs) => {
   /* const {data} = await loadQuery<SanityDocument>(
        TAXONOMY_PRODS_ATTRS_VARIANTS_ATTRS_QUERY_LOCALIZED,
        params
    )
    //console.log(data)
    //TODO is new Headers() working ok?
    //https://sergiodxa.com/tutorials/load-only-the-data-you-need-in-remix
    //TODO is new Headers() working ok?  https://pyk.sh/remix-set-stale-while-revalidate-cache-control-to-improve-performance#heading-implementing-in-remix
//https://sergiodxa.com/articles/http-vs-server-side-cache-in-remix
//https://remix.run/docs/en/main/discussion/state-management

    /!*data.headers=new Headers()
    const realtimeCaches: { [key: string]: string } = {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=82800"
    };

    // Apply the cache settings to the response
    for (const key of Object.keys(realtimeCaches)) {
      data.headers.append(key, realtimeCaches[key]);
    }*!/
    if (!data) {
        throw new Response("Not Found", { status: 404 });
    }*/




/*
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos');

    const data = await resp.json();

    let input = '*[completed == true]{title, userId}'

// Returns an ESTree-inspired syntax tree
    let tree = parse(input)

    //console.log(data)
// Evaluate a tree against a dataset
    let value = await evaluate(tree, {data})
    console.log(value)
// Gather everything into one JavaScript object
    let result = await value.get()
    console.log(result)*/


    let input = '*[id == 2]{title, userId}'

// Returns an ESTree-inspired syntax tree
    let tree = parse(input)

    let resp =  await fetch('https://jsonplaceholder.typicode.com/todos')
    const dataset = await resp.json()
// Evaluate a tree against a dataset
    let value = await evaluate(tree, {dataset})

// Gather everything into one JavaScript object
    let result = await value.get()

    console.log(result)
    return {result}
}


export const handle = {

    breadcrumb: () => <Link to="/locale/">{useParams().slug}</Link>,
};


export const meta: MetaFunction = () => {
    return [
        {title: useParams().slug},
        {name: 'description', content: 'Welcome to Remix!'},
    ]
}

export default function TaxonomyRoute() {



    const {result} = useLoaderData<typeof loader>()

    return (
        <>
               {/* <Sidebar></Sidebar>*/}
                <Taxonomy taxonomies={result}/>

        </>

    )
}
