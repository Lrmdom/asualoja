import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes";

export default function Variants({product}: { product: SanityDocument }) {
    /*const {
        variants
    } = product*/
    if(Array.isArray(product.variants)){
        console.log(product)

    }else{
        return null
    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {product.variants.map((variant) => {
                return (
                    <>
                        <div key={variant._id}>
                          <span>
                            {variant.title}
                          </span>
                            <Attributes product={variant}></Attributes>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



