import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"

export default function Attributes({product}: { product: SanityDocument }) {
    /*const {
        attributes,
    } = product*/
    /*const {
        title,
        value,
    } = attributes

    let displayAttrs
    if (attributes) {

        displayAttrs = <Attributes attributes={attributes}></Attributes>
    } else {

    }*/
    if(Array.isArray(product.attributes)){
        console.log(product)

    }else{
        return null
    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {product.attributes.map((attribute) => {
                return (
                    <>
                        <div key={attribute._id}>
                          <span>
                            {attribute.name}
                          </span>
                            <span>
                            {attribute.value}
                          </span>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



