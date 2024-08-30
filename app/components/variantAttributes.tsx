import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attribute from "~/components/attribute";
import {Avatar, Dropdown, InputRadioGroup, InputToggleButton, ListItem, Text} from '@commercelayer/app-elements'
import {Suspense} from "react";
import { ClientOnly } from "remix-utils/client-only"

export default function VariantAttributes({attributes}: { attribute: SanityDocument }) {

    //todo , group and display by attribute name. On select attributes, apply sku code data to <cl-price> and <cl-add-to-cart>
    return (
        <main className="">

            {Object.entries(attributes).map((attribute) => {
                //atribute[0] is name and attribute[1] is array of value/s

                return (
                    <>

                        {attribute[1].length > 0 ?


                                <Attribute attribute={attribute[1]}></Attribute>
                            : null}


                    </>
                )
            })}
        </main>
    )
}



