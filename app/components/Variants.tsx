import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import {ClientOnly} from "remix-utils/client-only"
import {useTranslation} from 'react-i18next'


//import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";

/*const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})*/

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



