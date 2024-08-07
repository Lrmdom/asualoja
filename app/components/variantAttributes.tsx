import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {
    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
console.log(attributes)
    if (Array.isArray(attributes)) {
        return (
            <main className="border border-primary border-1 rounded p-2 w-60">
                {attributes.map((attribute) => {
                    return (
                        <>
                            <div key={attribute._key} className="">
                                <b className="text-primary text-lg">{attribute.name}</b> :
                                {attribute.value}
                            </div>
                        </>
                    )
                })}
            </main>
        )
    } else {
        return null
    }


}



