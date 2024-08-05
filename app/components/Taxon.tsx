import type {SanityDocument} from '@sanity/client'
import Prods from '~/components/Prods'
import {stegaClean} from "@sanity/client/stega";

export default function Taxon({taxon}: { taxon: SanityDocument }) {

    if(Array.isArray(taxon.taxons)){
        return (
            <main className="container mx-auto prose prose-lg p-4 ">

                {taxon.taxons.map((tx) => {
                    return (
                        <>
                            <div key={tx._id}>
                          <span className="text-red">
                            {taxon.title}-{tx.title}
                          </span>
                                <Prods products={tx.products}></Prods>

                            </div>
                        </>
                    )
                })}

            </main>
        )
    }else{
        return (
            <main className="container mx-auto prose prose-lg p-4">


                <div key={taxon._id}>
                          <span className="text-red">
                           {stegaClean(taxon.title)}
                          </span>
                    <Prods products={taxon.products}></Prods>
                </div>


            </main>
        )
    }



}



