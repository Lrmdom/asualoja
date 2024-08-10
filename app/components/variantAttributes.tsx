import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attribute from "~/components/attribute";

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {
    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
    // todo , use new es to destructure attributes object

    return (
        <main className="">
            {Object.entries(attributes).map((attribute) => {
                return (
                    <>

                        <Attribute attribute={attribute[1]}></Attribute>

                    </>
                )
            })}
        </main>
    )
}



