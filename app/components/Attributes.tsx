import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"

export default function Attributes({attributes}: { attributeType: SanityDocument }) {

    const {
        title,
        value,
    } = attributes

    let displayAttrs
    if (attributes) {

        displayAttrs = <Attributes attributes={attributes}></Attributes>
    } else {

    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {attributes?.map((attribute) => {
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



