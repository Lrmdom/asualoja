import type {SanityDocument} from '@sanity/client'
import Taxons from '~/components/Taxons'
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
                <h1 className='text-2xl text-primary'>
                    <b>{title}</b>
                </h1>
            ) : null}
            {taxons?.map((taxon) => {
                return (
                    <>
                        <div key={taxon._id}>
                            <h2 className="text-xl font-bold tracking-tight text-primary">{`${taxon.title}`}</h2>
                        </div>
                        <Prods products={taxon.products}></Prods>

                        <Taxons taxon={taxon} ></Taxons>
                    </>
                )
            })}

        </main>
    )
}
