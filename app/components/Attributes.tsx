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

        displayAttrs = <Attributes product={product}></Attributes>
    } else {

    }*/
    if(Array.isArray(product.attributes)){
        return (
            <main className="">
                { product.attributes.map((attribute) => {
                    return (
                        <>
                            <div key={attribute._id}>
                          <span>
                            {attribute.name} ::  <span>
                            {attribute.value}
                          </span>
                          </span>

                            </div>

                        </>

                    )
                })}
            </main>
        )
    }else{
        return null
    }


}



