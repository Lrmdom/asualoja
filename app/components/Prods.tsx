import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";


import Variants from "~/components/variants";
import {useState} from "react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";
// import {authenticate} from '@commercelayer/js-auth'

export default function Prods({products}: { product: SanityDocument }) {
    //console.log(products)
    /*const auth = await authenticate('client_credentials', {
        clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
        scope: 'market:id:vlkaZhkGNj'
    })*/

    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage
    const [varianDetailLink, setVariantDetailLink] = useState("")

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
                    <div
                        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products?.map((prod) => {
                            if (Array.isArray(prod.variants)) {
                                prod.variantsImages = []

                                prod.variantsImages.push({"url": prod.imageUrl, "alt": stegaClean(prod.title)})

                                prod.variants.map((vrnt) => {
                                    const vAttrs = vrnt.attributes?.filter(attr => attr._type === 'attribute')
                                    vrnt.images?.map((image) => {
                                        image.alt ? image.alt : image.alt = stegaClean(vrnt.title)
                                        image.sku ? image.sku : image.sku = stegaClean(vrnt.sku)
                                        image.attributes ? image.attributes : image.attributes = stegaClean(vAttrs)
                                        prod.variantsImages.push(image)
                                    })
                                })
                            } else {
                                prod.variantsImages = [{"url": prod.imageUrl, "alt": stegaClean(prod.title)}]
                            }
                            let taxonomy = prod.taxonomies ? prod.taxonomies[0] : prod.taxonomy

                            return (
                                <>
                                    <div className="container mx-auto rounded border prose prose-lg">

                                            <Link
                                                className="overflow-x-auto text-xs font-semibold uppercase text-muted-foreground hover:text-primary hover:underline"
                                                 to={stegaClean(`/${language}/${encodeURI(stegaClean(taxonomy))}/${encodeURI(stegaClean(prod.taxons) || stegaClean(prod.parenttaxon))}/${encodeURI(stegaClean(prod.title))}`)}>
                                                {/*to={varianDetailLink}*/}


                                                {stegaClean(prod.title)}</Link>

                                        <Variants product={prod} ></Variants>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
