import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import {ClientOnly} from "remix-utils/client-only"
import {useTranslation} from 'react-i18next'
import {
    CommerceLayer,
    AvailabilityContainer,
    AvailabilityTemplate,
    Price,
    PricesContainer,
    SkusContainer,
    Skus,
    SkuField,
    OrderStorage,
    AddToCartButton,
    OrderContainer,
    LineItemsContainer,
    LineItem, LineItemImage, LineItemName, LineItemAmount, LineItemQuantity, LineItemsEmpty, OrderNumber, TotalAmount
} from "@commercelayer/react-components";

import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";

const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})

export default function Variants({product}: { product: SanityDocument }) {

    const {t} = useTranslation('')

    if (Array.isArray(product.variants)) {
        null
    } else {
        return null
    }

    return (

        <>


            <main className="">

                {product.variants.map((variant) => {
                    return (
                        <>
                            <div key={variant._id} className=" flex container w-2/2 border-2 text-right">
                                <div className="justify-end">
                                    <img src={variant.images ? variant.images[0].url : null} width={75}
                                         alt={variant.title}/>
                                </div>
                                <div>
                                    <span>{variant.title}</span>
                                    <span><Attributes product={variant}></Attributes></span>
                                </div>
                                <div>
                                    <cl-price code={stegaClean(variant.sku)}>
                                        <cl-price-amount type="compare-at"></cl-price-amount>
                                        <cl-price-amount type="price"></cl-price-amount>
                                    </cl-price>
                                </div>
                                <div>
                                    <cl-add-to-cart code={stegaClean(variant.sku)} quantity="1" kind="sku">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6">
                                            < path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" / >
                                        </svg>
                                        {t('Add to cart')}
                                    </cl-add-to-cart>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                        </>
                    )
                })}

            </main>
        </>
    )
}



