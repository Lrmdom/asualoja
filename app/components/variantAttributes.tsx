import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attribute from "~/components/attribute";

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {
    console.log(attributes)
    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
    return (
        <main className="">
            {Object.entries(attributes).map((attribute) => {
                return (
                    <>
                        <span className="text-white text-lg text-bold bg-purple-400 rounded p-2">{attribute[0]}</span>
                        <Attribute attribute={attribute[1]}></Attribute>

                    </>
                )
            })}
        </main>
    )
}



