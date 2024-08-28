import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attribute from "~/components/attribute";

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {

    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
    return (
        <main className="">
            {Object.entries(attributes).map((attribute) => {
                //atribute[0] is name and attribute[1] is array of value/s
console.log(attribute)
                return (
                    <>
                        {attribute[1].length > 0 ?

                            <div>
                            {/*<span
                                className="text-lg text-bold border-2 border-primary rounded p-2">{attribute[0]}</span>*/}
                                <Attribute attribute={attribute[1]}></Attribute>
                            </div>
                            : null}


                    </>
                )
            })}
        </main>
    )
}



