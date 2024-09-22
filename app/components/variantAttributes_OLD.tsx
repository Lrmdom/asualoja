import type {SanityDocument} from '@sanity/client'
import Attribute from "~/components/attribute";

export default function VariantAttributes_OLD({attributes}: { attribute: SanityDocument }) {

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



