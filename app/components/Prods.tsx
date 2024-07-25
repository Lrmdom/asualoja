import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"

export default function Prods({products}: { product: SanityDocument }) {
/*
    console.log(stegaClean("LEONNN"))
    console.log(stegaClean(products))*/


    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {products?.map((prod) => {
                return (
                    <>
                        <div key={prod._id}>
                          <span>
                            {prod.title}
                          </span>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



