import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";
import client from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)
function urlFor(source) {
    return builder.image(source)
}
export default function Prods({products}: { product: SanityDocument }) {

    return (
        <main className="container mx-auto prose prose-lg ">

            {products?.map((prod) => {
                return (
                    <>
                        <div>
                            <img src={prod.imageUrl} width={125} alt={prod.title}
                            />
                        </div>
                        <div key={prod._id}>

                            <span>
                            {prod.title}

                          </span>
                            <Attributes product={prod}></Attributes>
                        </div>
                        <Variants product={prod}></Variants>
                    </>
                )
            })}
        </main>
    )
}



