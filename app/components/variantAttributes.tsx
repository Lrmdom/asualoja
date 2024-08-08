import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attribute from "~/components/attribute";

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {
    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
    // todo , use new es to destructure attributes object

    return (
        <main className="border border-primary border-1 rounded p-2 w-60">
            {Object.entries(attributes).map((attribute) => {
                return (
                    <>
                        <b className="text-primary text-lg">{stegaClean(attribute[0])}</b>

                        <Attribute attribute={attribute[1]}></Attribute>

                    </>
                )
            })}
        </main>
    )
}



