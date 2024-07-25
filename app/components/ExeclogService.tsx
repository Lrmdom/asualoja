import type {SanityDocument} from '@sanity/client'
import Taxon from '~/components/Taxon'
import Prods from "~/components/Prods";
import {stegaClean} from "@sanity/client/stega";


export default function Service({taxonomies}: { taxonomy: SanityDocument }) {
    const {
        title,
        taxons,
    } = taxonomies


    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">
            {title ? (
                <h1>
                    <b>{title}</b>
                </h1>
            ) : null}
            {taxons?.map((taxon) => {
                return (
                    <>
                        <div key={taxon._id}>
                          <span className="bg-black text-white">
                            {taxon.title}
                          </span>
                            <Prods products={taxon.products}></Prods>
                        </div>
                        <Taxon taxon={taxon}></Taxon>
                    </>
                )
            })}

        </main>
    )
}
