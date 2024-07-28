import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes";

export default function Variants({variants}: { variant: SanityDocument }) {

    /*const {
        attributes,
    } = variants*/

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {variants?.map((variant) => {
                return (
                    <>
                        <div key={variant._id}>
                          <span>
                            {variant.title}
                          </span>
                            {/*todo add attributes*/}
                            <Attributes attributes={variant.attributes}></Attributes>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



