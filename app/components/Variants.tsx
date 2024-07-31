import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import { ClientOnly } from "remix-utils/client-only"

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

import { authenticate } from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";

const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})

export default function Variants({product}: { product: SanityDocument }) {

    if (Array.isArray(product.variants)) {
        null
    } else {
        return null
    }

    return (

        <>



            <main className="container mx-auto prose prose-lg p-4 border-4">

            {product.variants.map((variant) => {
                return (
                    <>
                        <div key={variant._id}>
                            <div>
                                <img src={variant.images ? variant.images[0].url : null} width={75}
                                     alt={variant.title}/>
                            </div>
                            <span>
                            {variant.title}
                          </span>
                            <span>
<cl-price code={stegaClean(variant.sku)}>
  <cl-price-amount type="compare-at"></cl-price-amount>
  <cl-price-amount type="price"></cl-price-amount>
</cl-price>
<cl-add-to-cart code={stegaClean(variant.sku)} quantity="1" kind="sku">
                            Add to cart
                        </cl-add-to-cart>
                            </span>


                            <Attributes product={variant}></Attributes>

                        </div>
                    </>
                )
            })}

        </main>
        </>
    )
}



