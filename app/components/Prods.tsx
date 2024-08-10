import type {SanityDocument} from '@sanity/client'
import {stegaClean} from "@sanity/client/stega"
import Variants from "~/components/Variants";
import Attributes from "~/components/Attributes";
import {Link} from "@remix-run/react";
import {useTranslation} from "react-i18next";
import {AddToCartButton, CommerceLayer, OrderStorage, Price, PricesContainer} from "@commercelayer/react-components";
import {ClientOnly} from "remix-utils/client-only"

export default function Prods({products}: { product: SanityDocument }) {
    //console.log(products)
    const {i18n} = useTranslation()
    const language = i18n.resolvedLanguage

    return (

        <div className="bg-white">
            <ClientOnly fallback={null}>
                {() => <CommerceLayer
                    accessToken={auth.accessToken}
                    endpoint="https://execlog.commercelayer.io"
                >
                    <div>AAAAAAAAAAAAAA</div>
                    <PricesContainer>
                        <div className="grid">
                            <Price
                                skuCode="SKU-BICI-EST-TREKMAD-SL7-GEN8-1"
                            />
                            <Price
                                skuCode="SKU-BICI-GRAVTREK-ALR4"
                            />
                        </div>
                    </PricesContainer>
                    <OrderStorage persistKey="cl-examples-addToCart">
                        <p>
                            <AddToCartButton
                                className="px-3 py-2 bg-black text-white rounded disabled:opacity-50"
                                label="Add SKU to cart"
                                quantity="2"
                                skuCode="SKU-BICI-EST-TREKMAD-SL7-GEN8-1"
                            />
                        </p>
                    </OrderStorage>
                </CommerceLayer>}
            </ClientOnly>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
                <div
                    className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products?.map((prod) => {

                        return (
                            <>
                                <div className="group relative">
                                    <div
                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
                                        {/*//TODO join variants images to product images to create a image slider*/}
                                        <img src={prod.imageUrl} width={75} alt={prod.title}
                                             className="h-full w-full object-contain object-center lg:h-full lg:w-full"/>
                                    </div>
                                    <div className="">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link
                                                    to={stegaClean(`/${language}/${prod.taxonomy}/${prod.taxons}/${prod.title}`)}> {stegaClean(prod.title)} </Link>

                                            </h3>
                                            <Attributes product={prod}></Attributes>
                                        </div>
                                        <Variants product={prod}></Variants>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
