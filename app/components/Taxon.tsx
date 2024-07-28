import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {stegaClean} from "@sanity/client/stega";

export default function Taxon({taxon}: { taxon: SanityDocument }) {
    const {
        title,
        taxons,
        products
    } = taxon

    let displayProds


    if (products) {

        displayProds = <Prods products={products}></Prods>
    } else {

    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {taxon.taxons?.map((tx) => {
                return (
                    <>
                        <div key={tx._id}>
                          <span className="bg-black text-red">
                            {tx.title}
                          </span>
                            {/*<Prods products={tx.products}></Prods>*/}
                            {displayProds}
                        </div>
                    </>
                )
            })}

        </main>
    )
}



