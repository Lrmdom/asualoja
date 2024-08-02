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
        <main className="container mx-auto prose prose-lg p-4 ">
            {title ? (
                <h1 className='text-2xl'>
                    <b>{title}</b>
                </h1>
            ) : null}
            {taxons?.map((taxon) => {
                return (
                    <>
                        <div key={taxon._id}>
                            <h2 className="text-xl font-bold tracking-tight text-gray-900">{`${taxon.title}`}</h2>
                        </div>
                        <Prods products={taxon.products}></Prods>

                        <Taxon taxon={taxon} ></Taxon>
                    </>
                )
            })}

        </main>
    )
}
