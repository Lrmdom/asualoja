import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";


import Variants from "~/components/variants";
import {useEffect, useState} from "react";
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";
import {CommerceLayer} from "@commercelayer/sdk";
// import {authenticate} from '@commercelayer/js-auth'
import Cookies from "js-cookie";
import { authenticate } from '@commercelayer/js-auth';

const auth = await authenticate('client_credentials', {
    clientId: 'vuuLuWnTGhUayS4-7LY8AR2mzbak5IxSf2Ts_VgQDTI',
    clientSecret: '8O9ft8XbknVZZcAqbd0BrxeUjlW7_ixb8pLhcR5f9SY'
})


const clIntegration = CommerceLayer({
    organization: import.meta.env.VITE_MY_ORGANIZATION,
    accessToken: auth.accessToken
})



export default function Prods({products}: { product: SanityDocument }) {

    const [variantsPrices, setVariantsPrices] = useState()

    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage

    useEffect(() => {


        const getCookieToken = Cookies.get("clIntegrationToken")
        const cl = CommerceLayer({
            organization: import.meta.env.VITE_MY_ORGANIZATION,
            accessToken: getCookieToken,
        })


        let customerId
        let orderId
        for (const [name, value] of Object.entries(Cookies.get())) {
            if (name.startsWith('commercelayer_order-id')) {
                orderId = value;
                //console.log(orderId)
                break;
            }

        }
        for (const [name, value] of Object.entries(Cookies.get())) {
            if (name.startsWith('commercelayer_session')) {
                const myArray = value.split("; ");

                customerId = JSON.parse(myArray).customerId


                clIntegration.customers.orders(customerId, {
                    fields: ['updated_at','status', 'number', 'id','created_at'],
                    sort: {updated_at: 'desc'},
                    filters: {status_start: 'Pend'}
                }).then(orders => {


                    //console.log(orders[0])
                    orderId = orders[0].id

                    const order = {
                        id: orderId,
                        language_code: language,
                        return_url: window.location.href,
                    }
                    cl.orders.update(order)
                    cl.orders.retrieve(orderId).then(order => {
                        console.log(order)
                    })
                    /*  let sorted = () => customer[0].orders.sort((a,b)=>{
                          return Date.parse(b.updated_at) - Date.parse(a.updated_at);
                      })
                      customer[0].orders=sorted()
                      console.log(customer[0].orders[0])*/
                })
                break;
            }
        }

        let customer

       /* let orderId;
        for (const [name, value] of Object.entries(Cookies.get())) {
            if (name.startsWith('commercelayer_order-id')) {
                orderId = value;
                console.log(orderId)
                break;
            }
        }
        if(orderId){
            const order = {
                id: orderId,
                language_code: language,
                //customer_email: "leonel.m.domingos@gmail.com",
                return_url: window.location.href,
            }
            const myorder = cl.orders.retrieve(orderId)
            /!* myorder.then(r => console.log(r))*!/

            cl.orders.update(order)
            //const customer = cl.customers.list({filters: {email_eq: attributes.email}})
            cl.orders.retrieve(orderId).then(order => {
                console.log(order)
            })
        }*/
        products?.map((prod,k) => {
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

                    prod.variantsPrice = []


                    const prices = async () => {

                        const skuVariantsPrices = await cl.skus.list({
                            include: ['prices','stock_items'],
                            filters: {code_eq: stegaClean(vrnt.sku)}
                        })
                        skuVariantsPrices[0] ? prod.variantsPrice.push([skuVariantsPrices[0]["prices"][0].amount_cents, skuVariantsPrices[0]["prices"][0].formatted_amount]) : null
                        prod.variantsPrice = prod.variantsPrice.sort((a, b) => a[0] - b[0])

                        skuVariantsPrices[0]? prod.stock_items = skuVariantsPrices[0]["stock_items"]:null

                        //setVariantsPrices(prod.variantsPrice)

                        products[k] = prod

                        //all state must be ready before render
                        await new Promise(r => setTimeout(r, 150))
                        setVariantsPrices(products)


                    }

                    prices()

                })
                /*const skusArr = function extractColumn(variants, field) {
                    return variants.map(x => x[field])
                }
                prod.variantsSkus = skusArr(prod.variants, 'sku')*/

            } else {
                prod.variantsImages = [{"url": prod.imageUrl, "alt": stegaClean(prod.title)}]
                prod.variantsPrice=[]
                prod.stock_items=[]
                products[k] = prod
                setVariantsPrices(products)
            }
        })
    }, [])
//ZUSTAND code
    /*const prodPrices = usePricesStore((state) => state.prices)
    const updatePrices = usePricesStore((state) => state.updatePrices)
    updatePrices(products)
    console.log(prodPrices)*/




    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
                    <div
                        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        { variantsPrices?

                            products.map((prod, key) => {
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
                                            <Variants product={variantsPrices[key]}></Variants>
                                        </div>
                                    </>
                                )
                            })
                            :null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
