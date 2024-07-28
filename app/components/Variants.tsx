import client, {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)
function urlFor(source) {
    return builder.image(source)
}

export default function Variants({product}: { product: SanityDocument }) {
    /*const {
        variants
    } = product*/
    if(Array.isArray(product.variants)){
        console.log(product)

    }else{
        return null
    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {product.variants.map((variant) => {
                return (
                    <>
                        <div key={variant._id}>
                            <div>
                                <img src={variant.images?variant.images[0].url:null} width={75} alt={variant.title} />
                            </div>
                            <span>
                            {variant.title}
                          </span>
                            <Attributes product={variant}></Attributes>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



