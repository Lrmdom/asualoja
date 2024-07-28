import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";

//todo add function to detect if prod have variants and attrs

export default function Prods({products}: { product: SanityDocument }) {


    /*let displayVariants
    if (variants) {

        displayVariants = <Variants variants={variants}></Variants>
    } else {

    }


    let displayAttrs
    if (attributes) {

        displayAttrs = <Attributes attributes={attributes}></Attributes>
    } else {

    }*/

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {products?.map((prod) => {
                return (
                    <>
                        <div key={prod._id}>
                          <span>
                            {prod.title}
                          </span>
                            {/*todo add attributes*/}
                            <Attributes attributes={prod.attributes}></Attributes>
                            {/*{displayAttrs}*/}
                        </div>
                        {/*{displayVariants}*/}
                        <Variants variants={prod.variants}></Variants>
                    </>
            )
            })}
            </main>
    )
}



