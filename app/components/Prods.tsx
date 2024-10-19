import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";


import Variants from "~/components/variants";
import * as React from "react";
import {useState} from "react";
import Cookies from "js-cookie";
import {CommerceLayer} from "@commercelayer/sdk";
// import {authenticate} from '@commercelayer/js-auth'


export default function Prods({products}: { product: SanityDocument }) {

    const [variantsPrice, setVariantsPrice] = useState()

    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage

    const getCookieToken = Cookies.get("clIntegrationToken")
    const cl = CommerceLayer({
        organization: import.meta.env.VITE_MY_ORGANIZATION,
        accessToken: getCookieToken,
    })

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


                                    const prices = async () => {
/*
                                        console.log(await cl.skus.list({filters: {code_eq: stegaClean(vrnt.sku)}}))
*/
                                        const skuVariantsPrices = await cl.skus.list({include: [ 'prices' ],filters: {code_eq: stegaClean(vrnt.sku)}})
                                        /*console.log(skuVariantsPrices)*/
                                        setVariantsPrice(skuVariantsPrices)
                                    };

                                    prices()
                                    console.log(variantsPrice)

                                })

                                /*const skusArr = function extractColumn(variants, field) {
                                    return variants.map(x => x[field])
                                }
                                prod.variantsSkus = skusArr(prod.variants, 'sku')*/
                                debugger


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
