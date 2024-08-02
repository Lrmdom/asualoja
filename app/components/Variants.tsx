import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import {ClientOnly} from "remix-utils/client-only"
import {useTranslation} from 'react-i18next'


//import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";
import {Link} from "@remix-run/react";

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
            <div className="group relative">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">


                    <div
                        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">

                            <img src={product.imageUrl} width={75} alt={product.title}
                                 className="h-full w-full object-contain object-center lg:h-full lg:w-full"/>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        {/*    todo if taxon array use product.taxons[0]*/}
                                        <Link
                                            to={stegaClean(`/${product.taxonomy}/${product.taxons}/${product.title}`)}> {stegaClean(product.title)} </Link>

                                    </h3>

                                    {/*
                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
*/}
                                    <Attributes product={product}></Attributes>
                                </div>
                                {/*
                                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
*/}
                                {/*<Variants product={product}></Variants>*/}
                            </div>
                        </div>
                    </div>

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

                </div>
            </div>
                </>
                )
                }



