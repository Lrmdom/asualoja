import {stegaClean} from "@sanity/client/stega"

import {useTranslation} from 'react-i18next'

import {authenticate} from '@commercelayer/js-auth'
import {SanityDocument} from "@sanity/client";
import VariantAttributes from "~/components/variantAttributes";
import {AddToCartButton, CommerceLayer, OrderStorage, Price, PricesContainer} from "@commercelayer/react-components";
import {ClientOnly} from "remix-utils/client-only"
import {InputToggleButton} from "@commercelayer/app-elements";

const auth = await authenticate('client_credentials', {
    clientId: '9BrD4FUMzRDTHx5MLBIOCOrs7TUWl6II0l8Q5BNE6w8',
    scope: 'market:id:vlkaZhkGNj'
})
console.log(auth)
export default function Variants({product}: { variants: SanityDocument }) {
    const {t} = useTranslation('')

    if (Array.isArray(product.variants)) {
        product.variantsImages = []
        product.variantsImages.push({"url": product.imageUrl})

        product.variants.map((vrnt) => {
            vrnt.images.map((image) => {

                product.variantsImages.push(image)
            })
        })
        //console.log(product)
        let variantsAttrs: any[] = []
        product.variants.map((variant) => {
            if (Array.isArray(variant.attributes)) {
                let vAttrs = variant.attributes.filter(attr => attr._type === 'attribute')
                vAttrs.forEach(function (element) {
                    element.sku = stegaClean(variant.sku)
                    element.images = variant.images
                    element.label = element.value

                });
                variantsAttrs = variantsAttrs.concat(vAttrs)
                variantsAttrs = variantsAttrs.sort((a, b) => a.name.localeCompare(b.name))
            }
        })

        let groupedVariantsAttrs = variantsAttrs.reduce((current, item) => {
            if (!current[stegaClean(item.name.trim())]) {
                current[stegaClean(item.name.trim())] = [];
            }
            current[stegaClean(item.name.trim())].push(item);

            return current;
        }, {});

        return (
            <>
                <div className="">

                   {/* <ClientOnly fallback={null}>
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
                    </ClientOnly>*/}


                    {/*<img src={variant.images ? variant.images[0].url : null} width={75}
                                         alt={variant.title}/>
                                    <span>{variant.title}</span>*/}

                    <span><VariantAttributes attributes={groupedVariantsAttrs}></VariantAttributes></span>
                    <cl-add-to-cart quantity="1" kind="sku">
                        {t('Add to cart')}
                    </cl-add-to-cart>
                </div>
            </>
        );
    } else {
        return null
    }


}



