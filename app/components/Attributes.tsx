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
         null
    }else{
        return null
    }

    return (
        <main className="">

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



