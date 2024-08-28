import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";
//import  Carousel from "~/components/Carousel"
import EmblaCarousel from '~/components/emblaCarousel/EmblaCarousel'
import {EmblaOptionsType} from 'embla-carousel'
import {Suspense} from "react";

export default function Prods({products}: { product: SanityDocument }) {
    //console.log(products)
    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage
    const OPTIONS: EmblaOptionsType = {}
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
                                    vrnt.images?.map((image) => {
                                        image.alt ? image.alt : image.alt = stegaClean(vrnt.title)
                                        image.sku ? image.sku : image.sku = vrnt.sku
                                        prod.variantsImages.push(image)
                                    })
                                })
                            } else {
                                prod.variantsImages = [{"url": prod.imageUrl, "alt": stegaClean(prod.title)}]
                            }
                            let taxonomy = prod.taxonomies ? prod.taxonomies[0] : prod.taxonomy

                            return (
                                <>
                                    <div className="container mx-auto prose prose-lg border rounded">
                                        <div className="overflow-auto m-2">
                                            <Link
                                                to={stegaClean(`/${language}/${ encodeURI(stegaClean(taxonomy))}/${encodeURI(stegaClean(prod.taxons) || stegaClean(prod.parenttaxon))}/${encodeURI(stegaClean(prod.title))}`)}> {stegaClean(prod.title)} </Link>
                                        </div>
                                        <Suspense>
                                            <EmblaCarousel slides={prod.variantsImages} options={OPTIONS}/>
                                        </Suspense>
                                        <div>


                                            <Attributes product={prod}></Attributes>
                                        </div>
                                        <Variants product={prod}></Variants>
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
